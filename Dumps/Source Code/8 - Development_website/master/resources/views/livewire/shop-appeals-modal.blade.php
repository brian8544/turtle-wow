<div class="modal fade" id="shopAppealRespondModal" tabindex="-1" aria-labelledby="shopAppealRespondLabel"
     aria-hidden="true"
     wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <div class="row">
                    <div class="col-lg-12 text-center p-5">
                        <h4 class="text-gray">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['message_history'] }}</h4>
                        @if ($shopAppeal)
                            <div style="height: 300px; overflow-y: scroll" class="text-left" id="messageHistory">
                                @forelse ($shopAppeal->messages as $message)
                                    <div class="{{ $message->support ? 'msg-right' : 'msg-left' }}">
                                        <div
                                            class="mb-2 message-container {{ $message->support ? 'text-right' : 'text-left' }}">
                                            <span
                                                class='{{ $message->support ? 'text-green'  : 'text-gray' }}'>{{ $message->support ? 'Turtle WoW ' . __('gm_ban_appeals_page')['gm_ban_appeals_modal']['support'] : $message->account->username }}</span>
                                            <small class="text-gray">
                                                - {{ $message->created_at->format('d.m.Y H:i') }}</small>
                                            <Br>
                                            <span class="text-gray">{{ $message->message }}</span>
                                        </div>
                                    </div>
                                @empty
                                @endforelse
                            </div>

                            <div class="response-ban-appeal">
                                <div class="mb-3 w-100">
                                    @if ($status == 'pending')
                                        <form wire:submit.prevent="submit('submitComment')">
                                            <textarea wire:model.defer="message" id="message" name="message"
                                                      class="form-control mt-3" placeholder="Message"
                                                      maxlength="1024"></textarea>
                                            <p class="text-muted">{{ __('ban_appeals_profile_page')['characters_left'] }}
                                                <span
                                                    id="character-count">1024</span></p>
                                            <button class="btn btn-warning mt-3">
                                                <i class="fa fa-fw fa-paper-plane"></i> {{ __('shop_appeals_page')['send_message'] }}
                                            </button>
                                            <button class="btn btn-success mt-3" wire:click="approveShopAppeal(false)">
                                                <i class="fa fa-fw fa-check"></i> {{ __('shop_appeals_page')['approve_appeal'] }}
                                            </button>
                                            <button class="btn btn-danger mt-3" wire:click="closeShopAppeal(false)">
                                                <i class="fa fa-fw fa-x"></i> {{ __('shop_appeals_page')['deny_appeal'] }}
                                            </button>
                                        </form>
                                    @endif


                                    <a href="{{ route('shop-history', ['accountId' => $shopAppeal->account_id]) }}"
                                       class="btn btn-secondary mt-3 btn-history" target="_blank">
                                        <i class="fas fa-history"></i> {{ __('shop_appeals_page')['see_full_shop_history'] }}
                                    </a>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
