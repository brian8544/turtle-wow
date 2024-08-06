<?php

namespace App\Providers;

use App\Events\CacheBugReport;
use App\Events\CharacterTransferDataRequest;
use App\Events\CharacterTransferRequest;
use App\Listeners\CacheBugReportListener;
use App\Listeners\SendCharacterGuidTransferData;
use App\Listeners\SendCharacterTransferData;
use App\Models\BugTracker;
use App\Observers\BugTrackerObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CharacterTransferRequest::class => [
            SendCharacterGuidTransferData::class
        ],
        CharacterTransferDataRequest::class => [
            SendCharacterTransferData::class
        ],
        CacheBugReport::class => [
            CacheBugReportListener::class
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
