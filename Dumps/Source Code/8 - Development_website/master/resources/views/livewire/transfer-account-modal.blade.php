<div class="modal fade ucp" id="transferAccount" tabindex="-1" aria-labelledby="transferAccountLabel"
     aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>
                <div class="row">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-8 text-center p-5"><h5 class="text-white mb-5">{{ __('transfer_account')['transfer_account'] }}</h5>
                        @if ($transferInProgress && !$transferComplete)
                        <p class="text-warning">
                            {{ __('transfer_account')['your_account_is_locked'] }}
                            <br>
                            <br>
                            {{ __('transfer_account')['first_phase'] }}
                            <br>
                            <br>
                            {{ __('transfer_account')['second_phase'] }}
                            <br>
                            <br>{{ __('transfer_account')['third_phase'] }}<br>
                        </p>
                        @endif
                        @if ($transferComplete)
                        <p class="text-warning">
                            {{ __('transfer_account')['successfully_transferred'] }}
                            <br>
                        </p>
                        @endif
                        @if ($transferInProgress)
                        <table class="table table-striped light-borders table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{{ __('transfer_account')['name'] }}</th>
                                <th>{{ __('transfer_account')['status'] }}</th>
                                <th>{{ __('transfer_account')['action'] }}</th>
                            </tr>
                            </thead>
                            <tbody>
                                @forelse($characterTransfer as $charTransfer)
                                <tr style="color:wheat">
                                    <td>{{ $loop->index + 1 }}</td>
                                    <td>{{ $charTransfer->name }}</td>
                                    @switch($charTransfer->status)
                                        @case('pending')
                                            <td>{{ __('transfer_account')['not_requested'] }}</td>
                                        @break
                                        @case('in_progress')
                                            <td>{{ __('transfer_account')['requested'] }}</td>
                                        @break
                                        @case('transferred')
                                            <td>{{ __('transfer_account')['transferred'] }}</td>
                                        @break
                                        @case('failed')
                                            <td>{{ __('transfer_account')['failed'] }}</td>
                                        @break
                                    @endswitch
                                    <td>
                                        @switch($charTransfer->status)
                                            @case('pending')
                                                <button class="btn btn-sm btn-primary" wire:click="beginTransferCharacter({{ $charTransfer->source_character_guid }})" wire:loading.remove>
                                                    <a><i class="fa fa-fw fa-play"></i>{{ __('transfer_account')['start_process'] }}</a>
                                                </button>
                                            @break
                                            @case('in_progress')
                                                <button class="btn btn-sm btn-primary" wire:click="completeTransferCharacter({{ $charTransfer->source_character_guid }})" wire:loading.remove>
                                                    <a><i class="fa fa-fw fa-check"></i>{{ __('transfer_account')['complete_process'] }}</a>
                                                </button>
                                            @break
                                            @case('transferred')
                                                <span>{{ __('transfer_account')['transferred'] }}</span>
                                            @break
                                            @case('failed')
                                                <a wire:click="retryTransferCharacter({{ $charTransfer->source_character_guid }})" wire:loading.remove>{{ __('transfer_account')['retry_process'] }}</a>
                                            @break
                                        @endswitch
                                    </td>
                                </tr>
                                @empty
                                @endforelse
                            </tbody>
                        </table>
                        @endif
                        @if ($needNewAccount && !$transferInProgress && !$transferComplete)
                            <p class="text-warning">
                                {{ __('transfer_account')['username_exists'] }}
                            </p>
                            @if ($needNewEmail)
                                <p class="text-warning">
                                    {{ __('transfer_account')['email_exists'] }}
                                </p>
                            @endif
                        @endif
                        @if ($banned)
                            <p class="text-warning">
                                {{ __('transfer_account')['account_banned'] }}
                            </p>
                        @endif
                        @if ($accountOnline)
                            <p class="text-warning">
                                {{ __('transfer_account')['account_online'] }}
                            </p>
                        @endif
                        @if ($responseMessage)
                            <div class="orange-text pb-2">
                                {{ $responseMessage }}<br>
                            </div>
                        @endif

                        @if ($needNewAccount && !$transferInProgress && !$banned && !$accountOnline && !$transferComplete)
                            @if ($needNewEmail)
                                <input
                                    type="text" class="form-control @error('newEmail') invalid @enderror" placeholder="Email"
                                    wire:model.defer="newEmail" name="newEmail" wire:key="newEmail">
                                @error('newEmail')
                                <div class="orange-text pb-2">
                                    {{ $message }}<br>
                                </div>
                                @enderror
                            @endif
                        <input
                            type="text" class="form-control @error('newUsername') invalid @enderror" placeholder="Username"
                            wire:model.defer="newUsername" name="newUsername" wire:key="newUsername">
                            @error('newUsername')
                                <div class="orange-text pb-2">
                                    {{ $message }}<br>
                                </div>
                            @enderror
                        <input
                            type="password" class="form-control w-50 pull-left @error('password') invalid @enderror" placeholder="Password"
                            wire:model.defer="password" name="password" wire:key="password">
                            @error('password')
                                <div class="orange-text pb-2">
                                    {{ $message }}<br>
                                </div>
                            @enderror
                        <input
                            type="password" class="form-control w-50 pull-right @error('confirmPassword') invalid @enderror"
                            placeholder="Repeat Password"
                            wire:model.defer="confirmPassword" name="confirmPassword" wire:key="confirmPassword">
                            @error('confirmPassword')
                                <div class="orange-text pb-2">
                                    {{ $message }}<br>
                                </div>
                            @enderror
                        @endif

                        @if (!$transferInProgress && !$banned && !$accountOnline && !$transferComplete)
                        <select
                            wire:model="realm_id" class="form-control" wire:key="realmId">
                            @foreach($realmLists as $realmList)
                                <option value="{{ $realmList['id'] }}">{{ $realmList['realmName'] }}</option>
                            @endforeach
                        </select>
                        @error('realm_id')
                            <div class="orange-text pb-2">
                                {{ $message }}<br>
                            </div>
                        @enderror
                        @endif

                        @if (!$transferInProgress && !$banned && !$accountOnline && !$transferComplete)
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="confirmationCheckbox"
                                       wire:model.live="confirmationCheckbox" name="confirmationCheckbox" wire:key="confirmationCheckbox">
                                <label class="form-check-label text-gray" for="confirmationCheckbox">
                                    {!! __('transfer_account')['confirmation'] !!}
                                </label>
                                @if ($confirmationCheckbox)
                                    <img src="{{ Vite::asset('resources/images/registerbutton.png') }}"
                                         class="w-100 hand register mt-3"
                                         wire:click="transferAccount()" wire:loading.remove>
                                @endif
                            </div>
                        @endif

                        <div class="response m-3 text-white" ng-if="response != '' && !transfer_err">
                            {{-- {{response}}--}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
