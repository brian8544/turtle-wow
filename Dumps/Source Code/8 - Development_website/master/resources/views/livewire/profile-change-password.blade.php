<div class="col-lg-12 collapse" id="security" role="tabpanel" aria-labelledby="profile-security" wire:ignore.self>
    <div class="row">
        <div class="col-lg-6">
            <h3 class="orange-text">{{ __('change_password_modal')['title'] }}</h3>
            <form wire:submit.prevent="update" id="change-password-form">
                <table class="table">
                    <tbody>
                    <tr>
                        <td>
                            <strong>{{ __('change_password_modal')['current_password'] }}</strong>
                        </td>
                        <td>
                            <input type="password" class="form-control @error('currentPassword') is-invalid @enderror" placeholder="{{ __('change_password_modal')['placeholder']['password'] }}" name="currentPassword" wire:model.defer="currentPassword">
                            @error('currentPassword') <small class="text-danger"> {{ $message }}</small> @enderror
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>{{ __('change_password_modal')['new_password'] }}</strong>
                            <br>
                            <small>
                                {{ __('change_password_modal')['new_password_repeat'] }}
                            </small>
                        </td>
                        <td>
                            <input type="password" class="form-control @error('newPassword') is-invalid @enderror" placeholder="{{ __('change_password_modal')['placeholder']['new_password'] }}" wire:model.defer="newPassword" name="newPassword">
                            @error('newPassword') <small class="text-danger"> {{ $message }}</small> @enderror
                            <input type="password" class="form-control @error('newPasswordRepeat') is-invalid @enderror" placeholder="{{ __('change_password_modal')['placeholder']['new_password_repeat'] }}" wire:model.defer="newPasswordRepeat" name="newPasswordRepeat">
                            @error('newPasswordRepeat') <small class="text-danger"> {{ $message }}</small> @enderror
                        </td>
                    </tr>
                    @if ($security)
                    <tr>
                        <td>
                            <strong>{{ __('change_password_modal')['title_2fa'] }}</strong>
                            <br>
                            <small>
                                {{ __('change_password_modal')['placeholder']['one_time_code'] }}
                            </small>
                        </td>
                        <td>
                            <input type="text" class="form-control @error('oneTimeCodeChangePassword') is-invalid @enderror" placeholder="{{ __('change_password_modal')['placeholder']['one_time_code'] }}" wire:model.defer="oneTimeCodeChangePassword" name="oneTimeCodeChangePassword">
                            @error('oneTimeCodeChangePassword') <small class="text-danger"> {{ $message }}</small> @enderror
                        </td>
                    </tr>
                    @endif
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <button class="btn btn-primary">
                                <i class="fa fa-fw fa-key"></i>{{ __('button')['change_my_password'] }}
                            </button>
                        </td>
                        <td>
                            <span class="text-muted">
                                {{ $message }}
                            </span>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </form>
        </div>
        <div class="col-lg-6">
            <h3 class="orange-text">{{ __('change_password_modal')['title_2fa'] }}</h3>

            <form wire:submit.prevent="@if ($security) disable2fa @else set2fa @endif" id="set-2fa-form">
                <table class="table">
                    <tbody>
                    <tr>
                        <td class="col-lg-6">
                            @if ($qrCode2fa)
                                <img src="{{ $qrCode2faDataUri }}" alt="QR Code">
                            @endif
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    @if ($collapseForm)
                        @if ($security)
                            <tr>
                                <td class="col-lg-6">
                                    {{ __('change_password_modal')['need_one_time_code'] }}
                                </td>
                            </tr>
                        @else
                            <tr>
                                <td class="col-lg-6">
                                    {{ __('change_password_modal')['your_secret_key'] }} <strong>{{ $secret2fa }}</strong>
                                </td>
                            </tr>
                        @endif
                        <tr>
                            <td class="col-lg-6">
                                <input type="text" class="form-control @error('oneTimeCode') is-invalid @enderror" placeholder="{{ __('change_password_modal')['placeholder']['one_time_code'] }}" name="oneTimeCode" wire:model.defer="oneTimeCode">
                                @error('oneTimeCode') <small class="text-danger"> {{ $message }}</small> @enderror
                            </td>
                        </tr>
                        <tr>
                            <td class="col-lg-6">
                                <button class="btn btn-primary">
                                    <i class="fa fa-fw fa-key"></i>{{ __('button')['submit'] }}
                                </button>
                            </td>
                        </tr>
                    @else
                        @if ($security)
                            <tr>
                                <td class="col-lg-6">
                                    <a class="btn btn-primary" wire:click="collapseFormButton">
                                        <i class="fa fa-fw fa-key"></i>{{ __('button')['disable_2fa'] }}
                                    </a>
                                </td>
                            </tr>
                        @else
                            <tr>
                                <td class="col-lg-6">
                                    <a class="btn btn-primary" wire:click="generate2fa">
                                        <i class="fa fa-fw fa-key"></i>{{ __('button')['enable_2fa'] }}
                                    </a>
                                </td>
                            </tr>
                        @endif
                    @endif
                    @if ($setSuccess2fa)
                        <tr>
                            <td class="col-lg-6">
                                {{ __('change_password_modal')['message']['enable_2fa'] }}
                            </td>
                        </tr>
                        <tr>
                            <td class="col-lg-6">
                                {{ __('change_password_modal')['your_recovery_code'] }} <strong>{{ $recoveryCode }}</strong>
                            </td>
                        </tr>
                    @endif
                    @if ($setSuccess2faDisable)
                        <tr>
                            <td class="col-lg-6">
                                {{ __('change_password_modal')['message']['disable_2fa'] }}
                            </td>
                        </tr>
                    @endif
                    </tfoot>
                </table>
            </form>
        </div>
    </div>
</div>
