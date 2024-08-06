<div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountLabel"
     aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5">

                        <h5 class="text-white mb-5">{{ __('page_profile')['overview']['delete_account'] }}</h5>

                        <p class="text-warning">{{ __('page_profile')['overview']['action_is_permanent'] }}</p>

                        <p class="text-white hand mt-3">
                            <input type="checkbox" class="form-check-input" id="confirmationCheckbox"
                                   wire:model.live="confirmationCheckbox">
                            {{ __('page_profile')['overview']['understand'] }}
                        </p>

                        @if ($confirmationCheckbox)
                            <div>
                                <label class="text-white w-100 text-left">
                                    {{ __('page_profile')['overview']['enter_email'] }}
                                    <input type="email" wire:model.defer="email" class="form-control">
                                </label>
                                <label class="text-white w-100 text-left">
                                    {{ __('page_profile')['overview']['enter_password'] }}
                                    <input type="password" wire:model.defer="password" class="form-control">
                                </label>
                            </div>
                        @endif

                        @if ($errors->any())
                            <div class="text-center text-white p-4">
                                {!! implode('', $errors->all(':message</br>')) !!}
                            </div>
                        @endif

                        @if ($characterMessage)
                            <div class="text-center text-white p-4">
                                {{ $characterMessage }}
                            </div>
                        @endif

                        @if ($confirmationCheckbox)
                            <button class="btn btn-danger mt-5" wire:click="deleteAccount" wire:loading.remove>
                                <i class="fa fa-fw fa-times"></i> {{ __('page_profile')['overview']['button_delete_account'] }}
                            </button>
                        @endif

                    </div>

                </div>

            </div>
        </div>
    </div>
</div>
