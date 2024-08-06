<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NewBugReportNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;

    public $tries = 3;
    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $target = config('customs.mattermost.bug_tracker.webhook_url');

            $body = "#### " . $this->data['title'] . "\n\n";
            $body .= "##### [bug-report#" . $this->data['id'] . "](" . \route('bug-report', ['id' => $this->data['id']]) . ")\n\n";
            $body .= "new-issue by " . $this->data['authorName'] . ":\n\n";

            $payload = 'payload={"text": "';
            $payload .= html_entity_decode($body);
            $payload .= '"}';

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $target);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            curl_exec($ch);

            curl_close($ch);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
        }
    }
}
