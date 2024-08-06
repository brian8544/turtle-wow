<div class="modal fade" id="register" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <a class="hand modalClose" data-bs-dismiss="modal" wire:click="toggleRegister">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5 collapse @if ($collapseRegister) show @endif">

                        <h5 class="text-white">{{ __('register_modal')['title'] }}</h5>

                        <br>
                        <br>

                        <form wire:submit.prevent="register">
                            <input type="text" class="form-control @error('username') invalid @enderror" placeholder="{{ __('register_modal')['placeholder']['account_name'] }}" name="username" wire:model.defer="username">
                            @error('username')
                            <div class="orange-text pb-2">
                                {{ $message }}
                            </div>
                            @enderror
                            <input type="text" class="form-control @error('email') invalid @enderror" placeholder="{{ __('register_modal')['placeholder']['email'] }}" name="email" wire:model.defer="email">
                            @error('email')
                            <div class="orange-text pb-2">
                                {{ $message }}
                            </div>
                            @enderror
                            @if (config('app.web_env') == "EN")
                                <input type="text" class="form-control @error('forumUsername') invalid @enderror" placeholder="{{ __('register_modal')['placeholder']['forum_username'] }}" name="forumUsername" wire:model.defer="forumUsername">
                                @error('forumUsername')
                                <div class="orange-text pb-2">
                                    {{ $message }}
                                </div>
                                @enderror
                            @endif
                            <input type="password" class="form-control w-50 float-left @error('password') invalid @enderror" placeholder="{{ __('register_modal')['placeholder']['password'] }}" name="password" wire:model.defer="password">
                            <input type="password" class="form-control w-50 float-right @error('confirmPassword') invalid @enderror" placeholder="{{ __('register_modal')['placeholder']['password_repeat'] }}" name="confirmPassword" wire:model.defer="confirmPassword">
                            @error('password')
                            <div class="orange-text pb-2 text-center">
                                {{ $message }}
                            </div>
                            @enderror
                            @error('confirmPassword')
                            <div class="orange-text pb-2 text-center">
                                {{ $message }}
                            </div>
                            @enderror

                            <br>
                            <div id="turnstile-container">
                                <x-turnstile wire:model="cloudflareToken" data-theme="dark" data-language="auto"/>
                            </div>
                            @error('cloudflareToken')
                            <div class="orange-text pb-2 text-center">
                                {{ $message }}
                            </div>
                            @enderror
                            <br>

                            <button type="submit" class="w-100 hand register">
                                <img src="{{ Vite::asset('resources/images/registerbutton.png') }}" alt="Register" class="w-100">
                            </button>

                            <div class="response m-3 text-white">
                                {{ $message }}
                            </div>
                        </form>

                        <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-5 mb-5 w-100" alt="Footerline">

                        <a class="hand mr-3" href="{{ route('login') }}" style="color: #fb8a4c !important;">
                            <img src="{{ Vite::asset('resources/images/icon_user_small.png') }}" class="mr-2" alt="User Icon">
                            {{ __('button')['log_in'] }}
                        </a>

                        <a class="hand ml-3" style="color: #fb8a4c !important;" data-bs-target="#collapseForgotPassword" aria-expanded="false" aria-controls="collapseForgotPassword" wire:click="toggleForgotPassword">
                            <img src="{{ Vite::asset('resources/images/icon_exclamation.png') }}" class="mr-2" alt="Exclamation Icon">
                            {{ __('button')['forgot_password'] }}
                        </a>

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5 collapse @if ($collapseForgotPassword) show @endif" id="collapseForgotPassword">

                        <h5 class="text-white">{{ __('register_modal')['forgot_your_password'] }}</h5>

                        <BR><BR>

                        <form wire:submit.prevent="resetPassword" id="reset-password-form">
                            <input type="email" class="form-control" placeholder="{{ __('register_modal')['placeholder']['email'] }}" wire:model.defer="resetEmail">

                            @if ($showSendButton)
                            <button type="submit" class="w-100 hand register">
                                <img src="{{ Vite::asset('resources/images/buttonforgot.png') }}" alt="Register" class="w-100">
                            </button>
                            @endif

                            @error('resetEmail') <div class="response m-3 text-white">{{ $message }}</div> @enderror

                            <div class="response m-3 text-white">
                                {{ $message }}
                            </div>

                        </form>

                        <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-5 mb-5 w-100" alt="Footerline">

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
