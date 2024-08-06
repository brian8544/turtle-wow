<?php

namespace App\Listeners;

use App\Models\BugTracker;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;

class CacheBugReportListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $bugReports = BugTracker::all()
            ->map(function ($bugTracker) {
                return [
                    'id' => $bugTracker->id,
                    'title' => $bugTracker->title,
                    'status' => $bugTracker->statuses ? $bugTracker->statuses->name_en : null,
                    'color' => $bugTracker->statuses ? $bugTracker->statuses->color : null
                ];
            })
            ->sortBy('status', SORT_REGULAR, true)
            ->values()
            ->toArray();

        Cache::forever('bug_reports', $bugReports);
    }
}
