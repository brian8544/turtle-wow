<div class="container">
    <div class="row">
        <div class="col-lg-4 m-auto login-box p-5 collapse @if ($collapseCheckUsername) show @endif">
            @turnstileScripts()
            <h5 class="text-white text-center mb-5">{{ __('login_modal')['title'] }}</h5>
            <form wire:submit.prevent="checkUsername">
                <input type="text" class="form-control" placeholder="{{ __('login_modal')['placeholder']['username'] }}"
                       name="username" wire:model.defer="username" required="" autofocus="">
                @error('username') <small class="text-danger">{{ $message }}</small> @enderror

                <div id="turnstile-login-container">
                    <x-turnstile wire:model="cloudflareToken" data-theme="dark" data-language="auto"/>
                </div>

                @error('cloudflareToken') <small class="text-danger">{{ $message }}</small> @enderror

                <button class="btn btn-success mt-3" type="submit">{{ __('button')['next'] }}</button>
            </form>

            <a href="{{ route('home') }}">{{ __('button')['back_to_home'] }}</a>
            <a class="float-right" data-bs-target="#collapseForgotPassword" aria-expanded="false"
               aria-controls="collapseForgotPassword"
               wire:click="toggleForgotPassword">{{ __('login_modal')['password_reset'] }}</a>
        </div>
        <div class="col-lg-4 m-auto login-box p-5 collapse @if ($collapseForgotPassword) show @endif">
            <h5 class="text-white text-center mb-5">{{ __('login_modal')['title'] }}</h5>
            <form wire:submit.prevent="resetPassword">
                {!! __('login_modal')['password_reset_body'] !!}
                <input type="email" class="form-control" placeholder="{{ __('login_modal')['placeholder']['email'] }}"
                       name="email" required="" autofocus="" wire:model.defer="resetEmail">
                @if ($showSendButton)
                    <button class="btn btn-success mt-3" type="submit">{{ __('button')['send'] }}</button>
                @endif

                <div class="orange-text pb-2 text-center">
                    {{ $message }}
                </div>
            </form>

            <a href="{{ route('home') }}">{{ __('button')['back_to_home'] }}</a>
        </div>
        <div class="col-lg-4 m-auto login-box p-5 collapse @if ($collapseLogin) show @endif">
            <h5 class="text-white text-center mb-5">{{ __('login_modal')['title'] }}</h5>

            <p class="text-muted"> {{ __('custom.login_modal.welcome', ['username' => $username]) }}</p>

            <form wire:submit.prevent="login">
                <input type="password" class="form-control"
                       placeholder="{{ __('login_modal')['placeholder']['password'] }}" name="password" required=""
                       autofocus="" wire:model.defer="password">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="rememberMe" wire:model.live="rememberMe">
                    <label class="form-check-label text-muted" for="rememberMe">
                        {{ __('login_modal')['remember_me'] }}
                    </label>
                </div>
                @error('username') <small class="text-danger">{{ $message }}</small> @enderror
                @error('password') <small class="text-danger">{{ $message }}</small> @enderror

                <button class="btn btn-success mt-3" type="submit">{{ __('button')['login'] }}</button>

                <br>
                <br>
                <a class="small mt-3"
                   href="{{ route('login') }}">{{ __('custom.login_modal.change_username', ['username' => $username]) }}</a>
            </form>

            <a href="{{ route('login') }}">{{ __('button')['back_to_home'] }}</a>
            <a class="float-right" data-bs-target="#collapseForgotPassword" aria-expanded="false"
               aria-controls="collapseForgotPassword"
               wire:click="toggleForgotPassword">{{ __('login_modal')['password_reset'] }}</a>
        </div>
        <div class="col-lg-4 m-auto login-box p-5 collapse @if ($collapse2fa) show @endif">
            <h5 class="text-white text-center mb-5">{{ __('login_modal')['title'] }}</h5>

            <p class="text-muted"> {{ __('custom.login_modal.welcome2fa', ['username' => $username]) }}</p>

            <form wire:submit.prevent="login2fa">
                <input type="text" class="form-control"
                       placeholder="{{ __('login_modal')['placeholder']['one_time_code'] }}" name="oneTimeCode"
                       required="" autofocus="" wire:model.defer="oneTimeCode">
                @error('username') <small class="text-danger">{{ $message }}</small> @enderror
                @error('oneTimeCode') <small class="text-danger">{{ $message }}</small> @enderror

                <button class="btn btn-success mt-3" type="submit">{{ __('button')['login'] }}</button>

                <br>
                <br>
                <a class="small mt-3"
                   href="{{ route('login') }}">{{ __('custom.login_modal.change_username', ['username' => $username]) }}</a>
            </form>

            <a href="{{ route('login') }}">{{ __('button')['back_to_home'] }}</a>
            <a class="float-right" data-bs-target="#collapseForgot2FaCode" aria-expanded="false"
               aria-controls="collapseForgot2FaCode"
               wire:click="toggleForgot2FaCode">{{ __('login_modal')['reset_2_fa_code'] }}</a>
        </div>
        <div class="col-lg-4 m-auto login-box p-5 collapse @if ($collapseForgot2FaCode) show @endif">
            <h5 class="text-white text-center mb-5">{{ __('login_modal')['title'] }}</h5>
            <form wire:submit.prevent="updateFaCode">
                {!! __('login_modal')['2_fa_code_reset_body'] !!}
                <input type="text" class="form-control" placeholder="{{ __('reset_2_fa_code_form')['placeholder']['recovery_code'] }}"
                       name="recoveryCode" required="" autofocus="" wire:model.defer="recoveryCode">
                @if ($showReset2FaCodeButton)
                    <button class="btn btn-success mt-3" type="submit">{{ __('button')['reset_2_fa_code'] }}</button>
                @endif

                <div class="orange-text pb-2 text-center">
                    {{ $message }}
                </div>
            </form>

            <a href="{{ route('home') }}">{{ __('button')['back_to_home'] }}</a>
        </div>
    </div>

</div>
