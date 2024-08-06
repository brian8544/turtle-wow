<div class="modal fade" id="banAppealModal" tabindex="-1" aria-labelledby="banAppealLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <a data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                <div class="row">
                    <div class="col-lg-12 text-center p-5">
                        <h5 class="text-white mb-5">{{ __('ban_appeals_profile_page')['contact_support'] }}</h5>
                        @if ($user->latestBan()?->latestBanAppeal())
                            <div style="height: 300px; overflow-y: scroll" class="text-left" id="messageHistory">
                                    @forelse($user->latestBan()->latestBanAppeal()->messages as $message)
                                        <div class="{{ !$message->support ? 'msg-right' : 'msg-left' }}">
                                            <div class="mb-2 message-container {{ !$message->support ? 'text-right' : 'text-left' }}">
                                                <span class="{{ !$message->support ? 'text-gray' : 'text-green' }}">{{ !$message->support ? $message->account->username : 'Turtle WoW ' . __('gm_ban_appeals_page')['gm_ban_appeals_modal']['support'] }}</span>
                                                <small class="text-gray"> - {{ $message->created_at->format('d.m.Y H:i') }}</small>
                                                <br>
                                                <div class="text-white">{!! $message->message !!}</div>
                                            </div>
                                        </div>
                                    @empty
                                    @endforelse
                            </div>
                        @else
                            <div class="text-left text-muted">{{ __('ban_appeals_profile_page')['no_messages'] }} <a class="text-white" href="{{ route('rules') }}" target="_blank">{{ __('ban_appeals_profile_page')['terms_of_service'] }}</a>
                            </div>
                        @endif
                        @if (($user->latestBan()?->latestBanAppeal() && $user->latestBan()?->latestBanAppeal()->status == 'pending') || !$user->latestBan()?->latestBanAppeal())
                            <form wire:submit.prevent="submitMessage">
                                <textarea wire:model.defer="newMessage" id="newMessage" name="newMessage" class="form-control mt-3" placeholder="Message" maxlength="1024"></textarea>
                                <p class="text-muted">{{ __('ban_appeals_profile_page')['characters_left'] }} <span id="character-count" class="character-count">1024</span></p>
                                <button class="btn btn-primary mt-3">
                                    <i class="fa fa-fw fa-check"></i> {{ __('ban_appeals_profile_page')['send_message'] }}
                                </button>
                            </form>
                            @error($newMessage) <p class="text-muted">{{ $newMessage }}</p> @enderror
                        @else
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
