<div class="container mt-3">
    <div class="alert ucp d-flex align-items-center justify-content-between search-div-1200" role="alert" style="margin: 0">
        <p class="text-dark-white">{{ __('header')['you_need_to_verify'] }}</p>
        <button class="btn btn-primary" wire:click="resendVerification" {{ $buttonDisable ? 'style=display:none' : '' }}>{{ __('header')['resend_email'] }}</button>
    </div>
</div>
