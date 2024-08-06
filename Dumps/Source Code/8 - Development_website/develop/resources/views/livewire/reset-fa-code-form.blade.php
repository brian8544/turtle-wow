<div class="section mb-5" id="reset" style="background-image: url({{ Vite::asset('resources/images/bg1-new.png') }})">
    <div class="container-fluid pt-1">
        <div class="container pt-5 pb-5">
            <div class="row p-5 mt-5 mb-5">
                <div class="col-lg-12 ">
                    <h2 class="orange-text mb-2 font-weight-bold text-center">{{ __('reset_2_fa_code_form')['title'] }}</h2>
                    <div class="row">
                        <div class="col-lg-2"></div>
                        <div class="col-lg-8 text-center">
                            <br>
                            <form wire:submit.prevent="updateFaCode" id="set-fa-code-form">
                                @csrf
                                <input type="text" class="form-control @error('email') invalid @enderror" placeholder="{{ __('reset_2_fa_code_form')['placeholder']['email'] }}" name="email" wire:model.defer="email">
                                @error('email')
                                <div class="orange-text pb-2">
                                    {{ $message }}
                                </div>
                                @enderror
                                <input type="text" class="form-control @error('recoveryCode') invalid @enderror" placeholder="{{ __('reset_2_fa_code_form')['placeholder']['recovery_code'] }}" name="recoveryCode" wire:model.defer="recoveryCode">
                                @error('recoveryCode')
                                <div class="orange-text pb-2">
                                    {{ $message }}
                                </div>
                                @enderror

                                @if ($showButton)
                                    <label>
                                        <br>
                                        <input type="submit" value="{{ __('button')['reset_2_fa_code'] }}" style="width: 200px;">
                                    </label>
                                @endif
                                <div class="orange-text pb-2 text-center">
                                    {{ $message }}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
