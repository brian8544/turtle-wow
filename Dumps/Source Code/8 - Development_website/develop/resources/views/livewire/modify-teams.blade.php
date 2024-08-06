<div class="modal fade" id="teamModal" tabindex="-1" aria-labelledby="teamLabel"
     aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">
                <div wire:loading>
                    @livewire('loader-component')
                </div>

                <div class="row ucp p-5">
                    <div class="col-lg-12">
                        <a data-bs-dismiss="modal" aria-label="Close"><i
                                class="fa fa-fw fa-arrow-left"></i> {{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['back_to_list'] }}
                        </a>

                        <h3 class="m-3 text-white">{{ __('bug_tracker')['teams'] }}</h3>

                        <table class="table text-white mb-5">
                            <thead>
                            <tr>
                                <th>{{ __('bug_tracker')['id'] }}</th>
                                <th>{{ __('bug_report')['en_name'] }}</th>
                                <th>{{ __('bug_report')['cn_name'] }}</th>
                                <th>{{ __('bug_report')['color'] }}</th>
                                {{--
                                                                <th>{{ __('bug_report')['icon'] }}</th>
                                --}}
                                <th>{{ __('bug_report')['action'] }}</th>
                            </tr>
                            </thead>
                            @forelse($teams as $team)
                                <tr wire:key="team_{{ $team->id }}">
                                    <td>{{ $team->id }}</td>
                                    <td style="color: {{ $team->color }}">{{ $team->name_en }}</td>
                                    <td style="color: {{ $team->color }}">{{ $team->name_zh_cn }}</td>
                                    <td><span class="badge"
                                              style="background-color: {{ $team->color }}">{{ $team->color }}</span>
                                    </td>
                                    {{--<td>{{ $team->icon }}</td>--}}
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="editTeam({{ $team->id }})" wire:loading.remove>
                                            {{ __('button')['edit'] }}
                                        </button>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="deleteTeam({{ $team->id }})" wire:loading.remove>
                                            {{ __('button')['delete'] }}
                                        </button>
                                    </td>
                                </tr>
                            @empty
                            @endforelse
                        </table>

                        <div class="d-flex">
                            <div class="text-white d-flex flex-column align-content-lg-start">
                                <div class="mb-3" {{ $team_id ? "" : "style=display:none" }}>
                                    <label for="team_idTitle">{{ __('bug_tracker')['id'] }}</label>
                                    <input type="text" readonly class="form-control mt-1 @error('id') invalid @enderror"
                                           wire:model="team_id" name="team_id" id="team_idTitle">
                                    @error('team_id')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="team_newEnglishTitle">{{ __('bug_tracker')['en_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('team_en') invalid @enderror"
                                           id="team_newEnglishTitle"
                                           placeholder="{{ __('bug_tracker')['en_title'] }}" wire:model="team_en"
                                           name="team_en">
                                    @error('team_en')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="team_newChineseTitle">{{ __('bug_tracker')['cn_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('team_zh_cn') invalid @enderror"
                                           id="team_newChineseTitle"
                                           placeholder="{{ __('bug_tracker')['cn_title'] }}" wire:model="team_zh_cn"
                                           name="team_zh_cn">
                                    @error('team_zh_cn')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="newColor">{{ __('bug_tracker')['color'] }}</label>
                                    <input type="color" class="form-control mt-1 @error('team_color') invalid @enderror"
                                           id="newColor" wire:model="team_color" name="team_color">
                                    @error('team_color')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            <div class="text-white d-flex flex-column align-content-lg-start ml-5">

                                <div class="mb-3">
                                    <label for="team_description_en">{{ __('bug_report')['desc_en'] }}</label>
                                    <textarea class="form-control mt-2" id="team_description_en"
                                              wire:model="team_description_en"></textarea>
                                    @error('team_description_en') <span>{{ $message }}</span> @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="team_description_zh_cn">{{ __('bug_report')['desc_cn'] }}</label>
                                    <textarea class="form-control mt-2" id="team_description_zh_cn"
                                              wire:model="team_description_zh_cn"></textarea>
                                    @error('team_description_zh_cn') <span>{{ $message }}</span> @enderror
                                </div>
                            </div>

                            <div class="text-white d-flex flex-column align-content-lg-start ml-5">
                                <div class="mb-3">
                                    <label for="teamMembers">{{ __('bug_tracker')['team_members'] }}</label>
                                    <div class="dropdown mt-1">
                                        <button class="btn btn-secondary dropdown-toggle" type="button"
                                                id="teamMembersDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false" wire:ignore>
                                            {{ __('bug_tracker')['select_team'] }}
                                        </button>
                                        <div class="dropdown-menu text-white"
                                             aria-labelledby="teamMembersDropdown">
                                            @forelse($team_members as $key => $value)
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="{{ $key }}"
                                                           id="member{{ $key }}"
                                                           wire:model="team_members.{{ $key }}.selected"
                                                           @if ($value['selected']) checked @endif>
                                                    <label class="form-check-label" for="member{{ $key }}">
                                                        {{ $value['username'] }}
                                                    </label>
                                                </div>
                                            @empty
                                            @endforelse
                                        </div>
                                    </div>
                                </div>


                                {{--<div class="col-md-2 mb-3">
                                    <label for="newIcon">Icon</label>
                                    <input type="text" class="form-control" id="newIcon" placeholder="Icon">
                                </div>--}}
                                <div class="mb-3">
                                    <button type="button" id="submitTeamButton" class="btn btn-success" wire:click="submitTeam"
                                            wire:loading.remove>{{ $team_id ? __('bug_tracker')['edit_team'] : __('bug_tracker')['save_team'] }}</button>
                                    @if($team_id)
                                        <button type="button" class="btn btn-dark" wire:click="refreshComponent"
                                                wire:loading.remove>{{ __('button')['cancel'] }}</button>
                                    @endif
                                </div>
                            </div>
                        </div>
                        @if ($team_responseMessage)
                            <div class="alert alert-warning">{{ $team_responseMessage }}</div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module">

    function resetTeamMembersDropdown() {
        var dropdownButton = document.getElementById('teamMembersDropdown');
        dropdownButton.textContent = '{{ __('bug_tracker')['select_team'] }}';
    }

    $(document).ready(function () {
        $('.dropdown-menu').on('click', function (e) {
            if ($(this).hasClass('dropdown-menu-form')) {
                e.stopPropagation();
            }
        });
    });

    document.getElementById('submitTeamButton').addEventListener('click', function() {
        resetTeamMembersDropdown();
    });

    Livewire.on('updateDropMenu', (data) => {
        let teamMembersArray = data[0];
        var selectedOptions = [];

        for (let i = 0; i < teamMembersArray.length; i++) {
            let memberObject = teamMembersArray[i];

            for (let memberId in memberObject) {
                let memberInfo = memberObject[memberId];

                if (memberInfo['selected']) {
                    let username = memberInfo['username'];
                    selectedOptions.push(username.trim());
                }
            }
        }
        var dropdownButton = document.getElementById('teamMembersDropdown');


        if (selectedOptions.length > 0) {
            dropdownButton.innerHTML = selectedOptions.join(', ');
        } else {
            dropdownButton.textContent = '{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['select'] }}';
        }

    });
</script>
