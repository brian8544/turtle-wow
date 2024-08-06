<div class="modal fade ucp" id="emailChange" tabindex="-1" aria-labelledby="emailChangeLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5">

                        <h5 class="text-white mb-5">{{ __('change_email_modal')['title'] }}</h5>

                        <form wire:submit.prevent="update">
                            <input type="email" class="form-control @error('currentEmail') invalid @enderror" placeholder="{{ __('change_email_modal')['placeholder']['current_email'] }}" name="currentEmail" wire:model.defer="currentEmail">
                            @error('currentEmail') <br><small class="text-danger"> {{ $message }}</small> <br><br>@enderror

                            <input type="email" class="form-control @error('newEmail') invalid @enderror" placeholder="{{ __('change_email_modal')['placeholder']['new_email'] }}" name="newEmail" wire:model.defer="newEmail">
                            @error('newEmail') <br><small class="text-danger"> {{ $message }}</small> <br><br>@enderror

                            @if (!$success)
                            <button class="btn btn-primary mt-5">
                                <i class="fa fa-fw fa-check"></i>{{ __('button')['change_email_address'] }}
                            </button>
                            @endif
                        </form>

                        <div class="text-center text-white p-4">
                            {{ $message }}
                        </div>

                        @if ($success)
                        <button class="btn btn-primary mt-5" data-bs-dismiss="modal" wire:click="close">
                            <i class="fa fa-fw fa-check"></i>{{ __('button')['close'] }}
                        </button>
                        @endif

                    </div>

                </div>

            </div>
        </div>
    </div>
</div>
