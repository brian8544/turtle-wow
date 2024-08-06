<?php

namespace App\Listeners;

use App\Models\CharacterTransfer;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Contracts\Config\Repository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Symfony\Component\HttpKernel\Log\Logger;

class SendCharacterTransferData
{
    /**
     * The client instance
     */
    public Client $client;

    /**
     * @The repository instance
     */
    public Repository $config_repository;

    /**
     * The logger instance
     */
    public Logger $logger;
    /**
     * Create the event listener.
     */
    public function __construct(Client $client, Repository $config_repository, Logger $logger)
    {
        $this->client = $client;
        $this->config_repository = $config_repository;
        $this->logger = $logger;
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        if (!$event->data) {
            return;
        }

        $payload = [
            'data' => $event->data
        ];

        $configs = [
            'base_url' => env('TURTLE_CN_API_URL'),
            'headers' => [
                'Api-Key' => env('TURTLE_CN_API_KEY'),
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
            'json' => $payload
        ];

        try {
            $response = $this->client->post('proceed-transfer', $configs);
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
        }

        if ($response->getStatusCode() === 200) {
            $responseData = json_decode($response->getBody(), true);
            if ($responseData['transferStatus']) {
                $targetCharacterGuid = $responseData['guid'];

                $characterTransfer = CharacterTransfer::where('source_character_guid', $event->source_character_guid)->first();

                if ($characterTransfer) {
                    $characterTransfer->forceFill(['target_character_guid' => $targetCharacterGuid, 'status' => 'transferred'])->save();
                } else {

                }
            }
        } else {

        }
    }
}
