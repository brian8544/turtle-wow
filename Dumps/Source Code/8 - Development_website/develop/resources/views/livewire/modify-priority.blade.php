<div class="modal fade" id="priorityModal" tabindex="-1" aria-labelledby="priorityLabel"
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

                        <h3 class="m-3 text-white">{{ __('bug_tracker')['priorities'] }}</h3>

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
                            @forelse($priorities as $priority)
                                <tr wire:key="priority_{{ $priority->id }}">
                                    <td>{{ $priority->id }}</td>
                                    <td style="color: {{ $priority->color }}">{{ $priority->name_en }}</td>
                                    <td style="color: {{ $priority->color }}">{{ $priority->name_zh_cn }}</td>
                                    <td><span class="badge"
                                              style="background-color: {{ $priority->color }}">{{ $priority->color }}</span>
                                    </td>
                                    {{--<td>{{ $status->icon }}</td>--}}
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="editPriority({{ $priority->id }})" wire:loading.remove>
                                            {{ __('button')['edit'] }}
                                        </button>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="deletePriority({{ $priority->id }})" wire:loading.remove>
                                            {{ __('button')['delete'] }}
                                        </button>
                                    </td>
                                </tr>
                            @empty
                            @endforelse
                        </table>
                        <div class="d-flex">

                            <div class="form-row text-white d-flex flex-column align-content-lg-start">
                                <div class="mb-3" {{ $priority_id ? "" : "style=display:none" }}>
                                    <label for="priority_idTitle">{{ __('bug_tracker')['id'] }}</label>
                                    <input type="text" readonly
                                           class="form-control mt-1 @error('priority_id') invalid @enderror"
                                           wire:model="priority_id" name="priority_id" id="priority_idTitle">
                                    @error('priority_id')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="priority_newEnglishTitle">{{ __('bug_tracker')['en_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('priority_en') invalid @enderror"
                                           id="priority_newEnglishTitle"
                                           placeholder="{{ __('bug_tracker')['en_title'] }}" wire:model="priority_en"
                                           name="priority_en">
                                    @error('priority_en')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="priority_newChineseTitle">{{ __('bug_tracker')['cn_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('priority_cn') invalid @enderror"
                                           id="priority_newChineseTitle"
                                           placeholder="{{ __('bug_tracker')['cn_title'] }}" wire:model="priority_zh_cn"
                                           name="priority_zh_cn">
                                    @error('priority_zh_cn')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="priority_newColor">{{ __('bug_tracker')['color'] }}</label>
                                    <input type="color"
                                           class="form-control mt-1 @error('priority_color') invalid @enderror"
                                           id="priority_newColor" wire:model="priority_color" name="priority_color">
                                    @error('priority_color')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            {{--<div class="col-md-2 mb-3">
                                <label for="newIcon">Icon</label>
                                <input type="text" class="form-control" id="newIcon" placeholder="Icon">
                            </div>--}}
                            <div class="text-white d-flex flex-column align-content-lg-start ml-5">

                                <div class="mb-3">
                                    <label for="priority_description_en">{{ __('bug_report')['desc_en'] }}</label>
                                    <textarea class="form-control mt-2" id="priority_description_en"
                                              wire:model="priority_description_en"></textarea>
                                    @error('priority_description_en') <span>{{ $message }}</span> @enderror
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="priority_description_zh_cn">{{ __('bug_report')['desc_cn'] }}</label>
                                    <textarea class="form-control mt-2" id="priority_description_zh_cn"
                                              wire:model="priority_description_zh_cn"></textarea>
                                    @error('priority_description_zh_cn') <span>{{ $message }}</span> @enderror
                                </div>
                                <div class="mb-3">
                                    <button type="button" class="btn btn-success" wire:click="submitPriority"
                                            wire:loading.remove>{{ $priority_id ? __('bug_tracker')['edit_priority'] : __('bug_tracker')['save_priority'] }}</button>
                                    @if($priority_id)
                                        <button type="button" class="btn btn-dark" wire:click="refreshComponent"
                                                wire:loading.remove>{{ __('button')['cancel'] }}</button>
                                    @endif
                                </div>
                            </div>
                        </div>
                        @if ($priority_responseMessage)
                            <div class="alert alert-warning">{{ $priority_responseMessage }}</div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
