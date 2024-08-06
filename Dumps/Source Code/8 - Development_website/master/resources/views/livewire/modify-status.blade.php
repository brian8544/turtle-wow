<div class="modal fade" id="statusModal" tabindex="-1" aria-labelledby="statusLabel"
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

                        <h3 class="m-3 text-white">{{ __('bug_tracker')['statuses'] }}</h3>

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
                            @forelse($statuses as $status)
                                <tr wire:key="status_{{ $status->id }}">
                                    <td>{{ $status->id }}</td>
                                    <td style="color: {{ $status->color }}">{{ $status->name_en }}</td>
                                    <td style="color: {{ $status->color }}">{{ $status->name_zh_cn }}</td>
                                    <td><span class="badge"
                                              style="background-color: {{ $status->color }}">{{ $status->color }}</span>
                                    </td>
                                    {{--<td>{{ $status->icon }}</td>--}}
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="editStatus({{ $status->id }})" wire:loading.remove>
                                            {{ __('button')['edit'] }}
                                        </button>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="deleteStatus({{ $status->id }})" wire:loading.remove>
                                            {{ __('button')['delete'] }}
                                        </button>
                                    </td>
                                </tr>
                            @empty
                            @endforelse
                        </table>

                        <div class="d-flex">
                            <div class="form-row text-white d-flex flex-column align-content-lg-start">
                                <div class="mb-3" {{ $status_id ? "" : "style=display:none" }}>
                                    <label for="status_idTitle">{{ __('bug_tracker')['id'] }}</label>
                                    <input type="text" readonly class="form-control mt-1 @error('id') invalid @enderror"
                                           wire:model="status_id" name="status_id" id="status_idTitle">
                                    @error('status_id')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="status_newEnglishTitle">{{ __('bug_tracker')['en_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('status_en') invalid @enderror"
                                           id="status_newEnglishTitle"
                                           placeholder="{{ __('bug_tracker')['en_title'] }}" wire:model="status_en"
                                           name="status_en">
                                    @error('status_en')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="status_newChineseTitle">{{ __('bug_tracker')['cn_title'] }}</label>
                                    <input type="text"
                                           class="form-control mt-1 @error('status_zh_cn') invalid @enderror"
                                           id="status_newChineseTitle"
                                           placeholder="{{ __('bug_tracker')['cn_title'] }}" wire:model="status_zh_cn"
                                           name="status_zh_cn">
                                    @error('status_zh_cn')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="newColor">{{ __('bug_tracker')['color'] }}</label>
                                    <input type="color"
                                           class="form-control mt-1 @error('status_color') invalid @enderror"
                                           id="newColor" wire:model="status_color" name="status_color">
                                    @error('status_color')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                            </div>
                            {{--<div class="col-md-2 mb-3">
                                <label for="newIcon">Icon</label>
                                <input type="text" class="form-control @error('icon') invalid @enderror" id="newIcon" placeholder="Icon" wire:model="icon" name="icon">
                            </div>--}}
                            <div class="text-white d-flex flex-column align-content-lg-start ml-5">

                                <div class="mb-3">
                                    <label for="status_description_en">{{ __('bug_report')['desc_en'] }}</label>
                                    <textarea class="form-control mt-2" id="status_description_en"
                                              wire:model="status_description_en"></textarea>
                                    @error('status_description_en') <span>{{ $message }}</span> @enderror
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="status_description_zh_cn">{{ __('bug_report')['desc_cn'] }}</label>
                                    <textarea class="form-control mt-2" id="status_description_zh_cn"
                                              wire:model="status_description_zh_cn"></textarea>
                                    @error('status_description_zh_cn') <span>{{ $message }}</span> @enderror
                                </div>
                                <div class="mb-3">
                                    <button type="button" class="btn btn-success" wire:click="submitStatus"
                                            wire:loading.remove>{{ $status_id ? __('bug_tracker')['edit_status'] : __('bug_tracker')['save_status'] }}</button>
                                    @if($status_id)
                                        <button type="button" class="btn btn-dark" wire:click="refreshComponent"
                                                wire:loading.remove>{{ __('button')['cancel'] }}</button>
                                    @endif
                                </div>
                            </div>
                        </div>
                        @if ($status_responseMessage)
                            <div class="alert alert-warning">{{ $status_responseMessage }}</div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
