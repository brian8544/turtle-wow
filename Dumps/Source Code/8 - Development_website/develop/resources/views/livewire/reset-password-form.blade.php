<div class="section mb-5" id="reset" style="background-image: url({{ Vite::asset('resources/images/bg1-new.png') }})">
    <div class="container-fluid pt-1">
        <div class="container pt-5 pb-5">
            <div class="row p-5 mt-5 mb-5">
                <div class="col-lg-12 ">
                    <h2 class="orange-text mb-2 font-weight-bold text-center">{{ __('reset_password_form')['title'] }}</h2>
                    <div class="row">
                        <div class="col-lg-2"></div>
                        <div class="col-lg-8 text-center">
                            <br>
                            <form wire:submit.prevent="updatePassword" id="set-password-form">
                                @csrf
                                <input type="hidden" name="token" wire:model.defer="token" value="{{ $token }}">
                                <input type="text" class="form-control @error('email') invalid @enderror" placeholder="{{ __('reset_password_form')['placeholder']['email'] }}" name="email" wire:model.defer="email">
                                @error('email')
                                <div class="orange-text pb-2">
                                    {{ $message }}
                                </div>
                                @enderror
                                <input type="password" class="form-control w-50 float-left @error('password') invalid @enderror" placeholder="{{ __('reset_password_form')['placeholder']['password'] }}" name="password" wire:model.defer="password">
                                <input type="password" class="form-control w-50 float-right @error('password_confirmation') invalid @enderror" placeholder="{{ __('reset_password_form')['placeholder']['password_repeat'] }}" name="password_confirmation" wire:model.defer="password_confirmation">
                                @error('password')
                                <div class="orange-text pb-2 text-center">
                                    {{ $message }}
                                </div>
                                @enderror
                                @error('password_confirmation')
                                <div class="orange-text pb-2 text-center">
                                    {{ $message }}
                                </div>
                                @enderror

                                @if ($need2fa)
                                    <input type="text" class="form-control @error('oneTimeCode') invalid @enderror" placeholder="{{ __('login_modal')['placeholder']['one_time_code'] }}" name="oneTimeCode" wire:model.defer="oneTimeCode">
                                    @error('oneTimeCode')
                                    <div class="orange-text pb-2 text-center">
                                        {{ $message }}
                                    </div>
                                    @enderror
                                @endif

                                @if ($showButton)
                                <label>
                                    <br>
                                    <input type="submit" value="{{ __('button')['change_my_password'] }}" style="width: 200px;">
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
