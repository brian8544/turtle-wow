<?php

namespace App\Listeners;

use App\Models\CharacterTransfer;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Contracts\Config\Repository;
use Symfony\Component\HttpKernel\Log\Logger;

class SendCharacterGuidTransferData
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
        if (!$event->source_character_guid) {
            return;
        }

        $payload = [
            'lowGuid' => $event->source_character_guid
        ];

        $configs = [
            'headers' => [
                'X-API-Key' => config('customs.external.turtle_eu.api_key'),
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ],
            'json' => $payload,
            'verify' => false
        ];

        try {
            $response = $this->client->post(config('customs.external.turtle_eu.url') . '/initiate-transfer', $configs);
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
        }

        if ($response->getStatusCode() === 200) {
            $responseData = json_decode($response->getBody(), true);
            if ($responseData['transferStatus']) {
                $characterDump = $responseData['data'];

                $characterTransfer = CharacterTransfer::where('source_character_guid', $event->source_character_guid)->first();

                if ($characterTransfer) {
                    $characterTransfer->forceFill(['data' => $characterDump, 'status' => 'in_progress', 'target_realm_id' => $responseData['realmId']])->save();
                } else {

                }
            }
        } else {

        }
    }
}
