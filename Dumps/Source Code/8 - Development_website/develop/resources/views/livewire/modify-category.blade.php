<div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryLabel"
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

                        <h3 class="m-3 text-white">{{ __('bug_tracker')['categories'] }}</h3>

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
                            @forelse($categories as $category)
                                <tr wire:key="category_{{ $category->id }}">
                                    <td>{{ $category->id }}</td>
                                    <td style="color: {{ $category->color }}">{{ $category->name_en }}</td>
                                    <td style="color: {{ $category->color }}">{{ $category->name_zh_cn }}</td>
                                    <td><span class="badge"
                                              style="background-color: {{ $category->color }}">{{ $category->color }}</span>
                                    </td>
                                    {{--<td>{{ $status->icon }}</td>--}}
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="editCategory({{ $category->id }})" wire:loading.remove>
                                            {{ __('button')['edit'] }}
                                        </button>
                                        <button type="button" class="btn btn-primary"
                                                wire:click="deleteCategory({{ $category->id }})" wire:loading.remove>
                                            {{ __('button')['delete'] }}
                                        </button>
                                    </td>
                                </tr>
                            @empty
                            @endforelse
                        </table>

                        <div class="d-flex">
                            <div class="form-row text-white d-flex flex-column align-content-lg-start">
                                <div class="mb-3" {{ $category_id ? "" : "style=display:none" }}>
                                    <label for="category_idTitle">{{ __('bug_tracker')['id'] }}</label>
                                    <input type="text" readonly
                                           class="form-control mt-1 @error('category_id') invalid @enderror"
                                           wire:model="category_id" name="category_id" id="category_idTitle">
                                    @error('category_id')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="category_newEnglishTitle">{{ __('bug_tracker')['en_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('category_en') invalid @enderror"
                                           id="category_newEnglishTitle"
                                           placeholder="{{ __('bug_tracker')['en_title'] }}" wire:model="category_en"
                                           name="category_en">
                                    @error('category_en')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="category_newChineseTitle">{{ __('bug_tracker')['cn_title'] }}</label>
                                    <input type="text" class="form-control mt-1 @error('category_cn') invalid @enderror"
                                           id="category_newChineseTitle"
                                           placeholder="{{ __('bug_tracker')['cn_title'] }}" wire:model="category_zh_cn"
                                           name="category_zh_cn">
                                    @error('category_zh_cn')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="category_newColor">{{ __('bug_tracker')['color'] }}</label>
                                    <input type="color"
                                           class="form-control mt-1 @error('category_color') invalid @enderror"
                                           id="category_newColor" wire:model="category_color" name="category_color">
                                    @error('category_color')
                                    <div class="alert alert-warning">{{ $message }}</div> @enderror
                                </div>
                            </div>

                            <div class="text-white d-flex flex-column align-content-lg-start ml-5">

                                <div class="mb-3">
                                    <label for="category_description_en">{{ __('bug_report')['desc_en'] }}</label>
                                    <textarea class="form-control mt-2" id="category_description_en"
                                              wire:model="category_description_en"></textarea>
                                    @error('category_description_en') <span>{{ $message }}</span> @enderror
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="category_description_zh_cn">{{ __('bug_report')['desc_cn'] }}</label>
                                    <textarea class="form-control mt-2" id="category_description_zh_cn"
                                              wire:model="category_description_zh_cn"></textarea>
                                    @error('category_description_zh_cn') <span>{{ $message }}</span> @enderror
                                </div>
                                <div class="mb-3">
                                    <button type="button" class="btn btn-success" wire:click="submitCategory"
                                            wire:loading.remove>{{ $category_id ? __('bug_tracker')['edit_category'] : __('bug_tracker')['save_category'] }}</button>
                                    @if($category_id)
                                        <button type="button" class="btn btn-dark" wire:click="refreshComponent"
                                                wire:loading.remove>{{ __('button')['cancel'] }}</button>
                                    @endif
                                </div>
                            </div>
                            {{--<div class="col-md-2 mb-3">
                                <label for="newIcon">Icon</label>
                                <input type="text" class="form-control @error('icon') invalid @enderror" id="newIcon" placeholder="Icon" wire:model="icon" name="icon">
                            </div>--}}


                        </div>
                        @if ($category_responseMessage)
                            <div class="alert alert-warning">{{ $category_responseMessage }}</div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
