<div class="modal fade" id="banAppealRespondModal" tabindex="-1" aria-labelledby="banAppealRespondLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <a data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>

                <div class="row ucp">
                    <div class="col-lg-12">
                            <a data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-fw fa-arrow-left"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['back_to_list'] }}</a>

                        <a class="small m-3" href="">
                            <i class="fa fa-fw fa-refresh"></i> {{ __('gm_ban_appeals_page')['refresh'] }}
                        </a>

                        <h3 class="m-3 text-white">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['ban_info'] }}</h3>

                        @if ($banAppeal)
                        <table class="table table-striped text-white">
                            <thead>
                            <tr>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['account'] }}</th>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['ban_date'] }}</th>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['by_reason'] }}</th>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['date'] }}</th>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['status'] }}</th>
                                <th>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['table_headers']['actions'] }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ $banAppeal->account->username }}</td>
                                <td>{{ $banAppeal->ban ? date('d.m.Y H:i', $banAppeal->ban->bandate) : "Unknown" }}</td>
                                <td>{{ $banAppeal->ban?->bannedby ? : 'server' }}</td>
                                <td>
                                    <span id='ban_reason_original' style="display: inline">
                                        {{ $banReason }}
                                        <br>
                                        <button class='btn btn-primary' style='margin-top: 0.5rem' onclick='toggleBanReasonAlter()'>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['edit'] }}</button>
                                    </span>
                                    <div id='alter_ban_reason' style='display: none;'>
                                        <input type='text' wire:model.defer="banReason" name="banReason" class='form-control'>
                                        <button type='submit' class='btn btn-primary' wire:click="submit('submitBanReason')">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['save'] }}</button>
                                        <button type='button' class='btn btn-outline-light' onclick='toggleBanReasonAlter()'>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['cancel'] }}</button>
                                    </div>
                                </td>
                                <td><span class='text-danger'>{{ $banAppeal->ban?->unbandate ? ($banAppeal->ban->unbandate == $banAppeal->ban->bandate ? "permanent" : \Carbon\Carbon::parse(date('d.m.Y H:i', $banAppeal->ban?->unbandate))->diffForHumans()) : "unknown" }}</span></td>
                                <td><span class='{{ $banAppeal->ban?->active ? 'text-danger' : 'text-green' }}'>{{ $banAppeal->status }}</span></td>
                            </tr>
                            </tbody>
                        </table>

                            @if ($banAppeal->ban->active)
                                <div id="changeBanForm">
                                    <select class="form-control" id="change_ban_duration" name="changeBanDuration" wire:model.live="changeBanDuration">
                                        <option value="0">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['change_ban_duration_label'] }}</option>
                                        <option value="97920">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['1'] }}</option>
                                        <option value="293760">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['3'] }}</option>
                                        <option value="685440">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['7'] }}</option>
                                        <option value="1370880">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['14'] }}</option>
                                        <option value="2056320">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['21'] }}</option>
                                        <option value="2937060">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['30'] }}</option>
                                        <option value="5875200">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['options']['60'] }}</option>
                                    </select>
                                    <button type="button" class="btn btn-sm btn-primary" wire:click="modifyBanDuration">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['change_button'] }}</button>
                                </div>
                                @if ($responseBanReasonMessage)
                                    <p class='text-danger'>{{ $responseBanReasonMessage }}</p>
                                @endif
                                @error('banReason') <p class='text-danger'>{{ $message }}</p> @enderror"
                                @if ($responseBanDurationMessage)
                                    <p class='text-danger'>{{ $responseBanDurationMessage }}</p>
                                @endif
                                @error('changeBanDuration') <p class='text-danger'>{{ $message }}</p> @enderror"
                            @endif
                            <h4 class="text-gray">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['message_history'] }}</h4>

                            @forelse ($banAppeal->messages as $message)<div class="{{ $message->support ? 'msg-right' : 'msg-left' }}">
                                <div class="mb-2 message-container {{ $message->support ? 'text-right' : 'text-left' }}">
                                    <span class='{{ $message->support ? 'text-green'  : 'text-gray' }}'>{{ $message->support ? $message->account->username : ($message->account ? $message->account->username : 'deleted')}}</span>
                                    <small class="text-gray"> - {{ $message->created_at->format('d.m.Y H:i') }}</small>
                                    <Br>
                                    <span class="text-gray">{!! $message->message !!}</span>
                                </div>
                            </div>
                            @empty
                            @endforelse

                            @if ($banAppeal->status == 'pending')
                                <div class="response-ban-appeal">
                                    <div class="mb-3 w-100">

                                        @if ($responseMessage)
                                            <div class="alert alert-warning">{{ $responseMessage }}</div>
                                        @endif
                                        @error('message') <div class="alert alert-warning">{{ $message }}</div> @enderror"

                                        <label class="text-gray w-100">
                                            {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['your_response'] }}
                                            <textarea class="form-control mt-2 w-100" id="m" wire:model="message" name="massage" placeholder="Reply" rows="4"></textarea>
                                        </label>

                                        <div class="mt-3 pagination">
                                            <button class="btn custom-button btn-success mr-2 mb-2" wire:click="submit('submitComment')">
                                                <i class="fa fa-fw fa-paper-plane"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['button_labels']['send_message'] }}
                                            </button>
                                            <button class="btn custom-button btn-success mr-2 mb-2" wire:click="submit('unbanAccount')">
                                                <i class="fa fa-fw fa-check"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['button_labels']['send_message_unban'] }}
                                            </button>
                                            <button class="btn custom-button btn-warning mr-2 mb-2" wire:click="submit('closeAndCommit')">
                                                <i class="fa fa-fw fa-paper-plane"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['button_labels']['send_message_deny_appeal'] }}
                                            </button>
                                            <button class="btn custom-button btn-danger mr-2 mb-2" wire:click="submit('close')">
                                                <i class="fa fa-fw fa-paper-plane"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['button_labels']['deny_appeal'] }}
                                            </button>
                                        </div>
                                    </div>
                                    <div style="vertical-align: initial;">
                                        <label class="text-gray">
                                            {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_response'] }}
                                            <select class="form-control" style="margin-top: 0.5rem" wire:model="templateAnswer" wire:change="changeAnswer">
                                                <option value="">- {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['select'] }} -</option>
                                                <option value="{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['rmt_forbidden']['value'] }}">
                                                    {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['rmt_forbidden']['display'] }}
                                                </option>
                                                <option value="{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['read_and_accept_tos']['value'] }}">
                                                    {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['read_and_accept_tos']['display'] }}
                                                </option>
                                                <option value="{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['failed_appeal']['value'] }}">
                                                    {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['failed_appeal']['display'] }}
                                                </option>
                                                <option value="{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['unbanned_our_fault']['value'] }}">
                                                    {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['unbanned_our_fault']['display'] }}
                                                </option>
                                                <option value="{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['appeal_success']['value'] }}">
                                                    {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['template_responses']['appeal_success']['display'] }}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                <div class="ban-appeal-notes mt-5">
                                    <h3 class="text-gray">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['notes'] }}</h3>
                                    @if ($responseGmCommentMessage)
                                        <div class="alert alert-warning mt-3">{{ $responseGmCommentMessage }}</div>
                                    @endif
                                    @error('gmComment') <div class="alert alert-warning">{{ $message }}</div> @enderror"
                                    <p class="note-content text-gray">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['add_notes'] }}</p>
                                    <div id="readOnlyNotes" class="form-group">
                                        <textarea class='form-control' readonly wire:model.defer="gmComment" name="gmComment">{{ $banAppeal->gms_comment }}</textarea>
                                        <button class="edit-note-btn btn btn-primary" onclick='toggleNotesAlter()'>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['edit_notes'] }}</button>
                                    </div>
                                    <div id='alter_gm_notes' style='display: none;'>
                                        <textarea wire:model.defer="gmComment" name="gmComment" class='form-control'>{{ $banAppeal->gms_comment }}</textarea>
                                        <div class="mt-2">
                                            <button class='btn btn-primary' wire:click="submit('submitGmComment')">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['save'] }}</button>
                                            <button type='button' class='btn btn-outline-light' onclick='toggleNotesAlter()'>{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['cancel'] }}</button>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function toggleBanReasonAlter() {
        var originalReason = document.getElementById('ban_reason_original');
        var alterForm = document.getElementById('alter_ban_reason');

        if (originalReason.style.display === 'none' || originalReason.style.display === '') {
            originalReason.style.display = 'inline';
            alterForm.style.display = 'none';
        } else {
            originalReason.style.display = 'none';
            alterForm.style.display = 'inline';
        }
    }

    function toggleNotesAlter() {
        var notesDisplay = document.getElementById('alter_gm_notes').style.display;
        var editBtn = document.querySelector('.edit-note-btn');
        var readOnlyNotes = document.getElementById('readOnlyNotes');
        var alterNotesForm = document.getElementById('alter_gm_notes');

        if (readOnlyNotes.style.display === 'none') {
            readOnlyNotes.style.display = 'block';
            alterNotesForm.style.display = 'none';
        } else {
            readOnlyNotes.style.display = 'none';
            alterNotesForm.style.display = 'block';
        }

        if (notesDisplay === 'none') {
            document.getElementById('alter_gm_notes').style.display = 'block';
            editBtn.textContent = 'Cancel';
        } else {
            document.getElementById('alter_gm_notes').style.display = 'none';
            editBtn.textContent = 'Edit';
        }
    }
</script>
