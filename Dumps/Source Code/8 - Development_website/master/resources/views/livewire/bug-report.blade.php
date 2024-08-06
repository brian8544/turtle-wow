<div class="container ucp pl-5 pr-5 pt-3 pb-5 bug-report-page" style="width: 100%">
    <div wire:loading wire:target="submitNewMessage, commentImage">
        @livewire('loader-component')
    </div>
    <div class="mt-3">
        <a class="mt-5" id="backToList" style="font-family: 'DIN Pro' !important"> <i
                class="fa fa-fw fa-arrow-left"></i> {{ __('bug_report')['back_to_list'] }}</a>

    </div>

    <h3 class="mr-3 mt-3 ml-3 d-flex justify-content-between search-div-1400"
        style="color: #d6d1d1; word-break: break-word">
        <span>{{ $bugTracker->title }}
            <span
                class="text-dark-white">#{{ $bugTracker->id }}</span>
        </span>
        @if ($support)
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#linkIssueModal">
                <i class="fas fa-link"></i> {{ __('bug_tracker')['link_an_issue'] }}
            </button>
        @endif
    </h3>
    <div class="text-dark-white mb-3 mt-1 pb-3 border-bottom-light-gray">

    </div>
    <div class="d-flex justify-content-between bug-div">
        <div class="w-75 new-width">


            {{--<div id="changeBanForm" class="mb-5 w-50">
                <h5 class="text-white mb-3">{{ __('bug_tracker')['priority'] }}</h5>
                <select class="form-control" id="change_priority" name="priority" wire:model.live="priority">
                    <option value="0">{{ __('bug_report')['change_priority']}}</option>
                    @forelse($priorities as $key => $value)
                        <option value="{{ $key }}" @if ($value['selected']) selected @endif><span class="badge"
                                                                                                  style="background-color: {{ $value['color'] }}">{{ $value['name'] }}</span>
                        </option>
                    @empty
                    @endforelse
                </select>
                <button type="button" class="btn btn-sm btn-primary"
                        wire:click="modifyPriority">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['change_button'] }}</button>
            </div>--}}

            @php
                $reportsCount = $bugTracker->account?->bugReports?->count();
                $stars = 0;

                 if ($bugTracker->account && $bugTracker->account->rank == 0) {
                    if ($reportsCount >= 1 && $reportsCount <= 50) {
                        $stars = 1;
                    } elseif ($reportsCount > 50 && $reportsCount <= 100) {
                        $stars = 2;
                    } elseif ($reportsCount > 100 && $reportsCount <= 150) {
                        $stars = 3;
                    } elseif ($reportsCount > 150 && $reportsCount <= 200) {
                        $stars = 4;
                    } elseif ($reportsCount > 200) {
                        $stars = 5;
                    }
                }
            @endphp
            <div class="mb-5 chat-container">
                <div class="chat-header">
                    <div class="text-dark-white pl-2 d-flex justify-content-between">
                        <div>
                            <strong
                                class="bug-author">{{ $bugTracker->author }}</strong>
                            <span class="normal-font">{{ __('bug_report')['reported'] }}</span>
                        </div>
                        <div class="d-flex"> <span class="mr-2" style="color: var(--orange)">
                        @for ($i = 0; $i < $stars; $i++)
                                    &#9733;
                                @endfor
                        </span>
                            @if ($support || $owner)
                                <button type="button" class="btn btn-sm btn-secondary float-right"
                                        data-bs-toggle="modal" data-bs-target="#confirmationModal"
                                        style="margin-top: -4px">
                                    {{ __('button')['edit'] }}
                                </button>
                            @endif
                        </div>
                    </div>

                </div>
                <div class="chat-body">
                    {{--@if ($support || $owner)
                        --}}{{--<div contenteditable="true" class="text-dark-white pl-2 pt-2 editable-content markdown-content"
                             wire:keydown.enter.prevent="" wire:model.defer="description">
                            {!! nl2br(e($description)) !!}
                        </div>--}}{{--
                        <p class="text-dark-white pl-2 pt-2 editable-content markdown-content">{!! nl2br(e($bugTracker->description)) !!}</p>

                        <button type="button" class="btn btn-sm btn-primary mt-2 float-right mt-2"
                                data-bs-toggle="modal" data-bs-target="#confirmationModal">
                            {{ __('button')['edit'] }}
                        </button>
                    @else--}}
                    <p class="text-dark-white pl-2 pt-2 editable-content markdown-content"
                       wire:ignore>{!! nl2br(e($bugTracker->description)) !!}</p>
                    {{--@endif--}}
                    <div class="d-flex">
                        @forelse ($bugTracker->images as $image)
                            <div class="image-container position-relative d-inline-block pl-2 mr-3">
                                <img src="{{ $image->thumbnail }}" onclick="openModal('{{ url($image->large) }}')"
                                     style="cursor: pointer; border-radius: 10px" data-bs-toggle="modal"
                                     data-bs-target="#lightbox">
                                @if ($support || $owner)
                                    <i class="fas fa-times-circle position-absolute top-0 end-0"
                                       style="cursor:pointer; color: var(--blue-gray)"
                                       data-bs-target="#confirmDeleteModal" wire:click="setImageId({{ $image->id }})"
                                       data-bs-toggle="modal"
                                    ></i>
                                @endif
                            </div>
                        @empty
                        @endforelse
                    </div>
                </div>
                <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel"
                     aria-hidden="true" wire:ignore>
                    <div class="modal-dialog" style="max-width: 60rem !important;">
                        <div class="modal-content text-white p-5">
                            <div>
                                <button type="button" class="close text-white" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5>{{ __('bug_tracker')['edit_report'] }}</h5>

                            </div>
                            <div>
                                <textarea class="form-control mb-3 mt-2 normal-font" rows="5"
                                          wire:model.defer="description" style="min-height: 20rem"
                                          id="descriptionTextarea"></textarea>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">{{ __('button')['cancel'] }}</button>
                                <button type="button" class="btn btn-primary"
                                        wire:click="editReport"
                                        data-bs-dismiss="modal">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['save'] }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                @if ($support || $owner)
                    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModal"
                         aria-hidden="true" wire:ignore.self>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="text-white">{{__('shop_appeals_page')['image_deletion']}}
                                    </h5>
                                </div>
                                <div class="modal-body text-white">
                                    {{__('shop_appeals_page')['are_you_sure']}}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">{{__('button')['cancel']}}</button>
                                    <button type="button" class="btn btn-danger"
                                            id="deleteConfirmButton" wire:click="deleteImage"
                                            data-bs-dismiss="modal">{{__('button')['delete']}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            {{--    <div class="mb-5">
                    <h5 class="text-white">{{ __('bug_report')['bug_details']['related_reports'] }}</h5>

                    <table class="table text-dark-white w-75">
                        <thead>
                        <tr>
                            <th>{{ __('bug_report')['related_reports_table']['id'] }}</th>
                            <th>{{ __('bug_report')['related_reports_table']['title'] }}</th>
                            <th>{{ __('bug_report')['related_reports_table']['category'] }}</th>
                            <th>{{ __('bug_report')['related_reports_table']['status'] }}</th>
                            <th>{{ __('bug_report')['related_reports_table']['priority'] }}</th>
                            <th>{{ __('bug_report')['related_reports_table']['updated'] }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>124</td>
                            <td>Related Report 1</td>
                            <td>Category Option 2</td>
                            <td>Closed</td>
                            <td>Low</td>
                            <td>2023-01-05</td>
                        </tr>
                        </tbody>
                    </table>
                </div>--}}
            {{--
                        <div class="mb-3">
                            <h5 class="text-white">{{ __('bug_report')['bug_details']['comments'] }}</h5>

                            <ul class="list-group">
                                @forelse($bugTracker->messages as $message)
                                    <li class="list-group-item text-dark-white">
                                        <strong>{{ $message->account->username }}</strong>
                                        - {{ $message->created_at->format('H:i:s d/m/Y') }}
                                        <p>{{ $message->message }}</p>
                                    </li>
                                @empty
                                @endforelse
                            </ul>
                        </div>--}}

            <div class="mb-3">

                <ul style="padding: 0">
                    @forelse($bugTracker->messages as $message)
                        <li class="chat-container overflow-visible">
                            <div class="chat-header text-dark-white d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center justify-content-between w-100">
                                    <div>
                                        @php
                                            $reportsCount = $message->account?->bugReports?->count();
                                            $stars = 0;

                                             if ($message->account && $message->account->rank == 0) {
                                                if ($reportsCount > 0 && $reportsCount <= 50) {
                                                    $stars = 1;
                                                } elseif ($reportsCount > 50 && $reportsCount <= 100) {
                                                    $stars = 2;
                                                } elseif ($reportsCount > 100 && $reportsCount <= 150) {
                                                    $stars = 3;
                                                } elseif ($reportsCount > 150 && $reportsCount <= 200) {
                                                    $stars = 4;
                                                } elseif ($reportsCount > 200) {
                                                    $stars = 5;
                                                }
                                            }
                                        @endphp
                                        <strong
                                            @if($message->account && $message->account->rank >= 2) style="color: var(--green);" @endif>
                                            {{ $message->author }}
                                        </strong>
                                        <span class="disappear normal-font">
                                            {{ __('bug_report')['commented_at'] }}
                                        </span>
                                        <span class="normal-font tooltip-target">
                                            {{ $message->created_at->diffForHumans() }}
                                            <span
                                                class="tooltip-text text-dark-white">{{ $message->created_at->toDayDateTimeString() }}</span>
                                        </span>

                                    </div>
                                    <span class="mr-2" style="color: var(--orange)">
                                    @for ($i = 0; $i < $stars; $i++)
                                            &#9733;
                                        @endfor
                                    </span>
                                    @if($message->account && $message->account->rank >= 2)
                                        <span class="badge mb-2 disappear"
                                              style=" border: 1px solid var(--green); color: var(--green); margin-right: 0.5rem">{{ __('bug_tracker')['staff'] }}</span>
                                    @endif
                                </div>
                                <div class="d-flex align-items-center">
                                    @if ($support)
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                                    id="commentOptions"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                <i class="fas fa-ellipsis-h"></i>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="commentOptions">
                                                <a class="dropdown-item" data-bs-toggle="modal"
                                                   data-bs-target="#editCommentModal"
                                                   wire:click="$dispatchTo('edit-comment', 'openModal', { commentId: {{ $message->id }}})"><i
                                                        class="fas fa-edit"
                                                    ></i> {{ __('bug_report')['edit_comment'] }}
                                                </a>
                                                <a class="dropdown-item" wire:click="deleteComment({{ $message->id }})"><i
                                                        class="fas fa-trash-alt"></i> {{ __('bug_report')['delete_comment'] }}
                                                </a>
                                            </div>
                                        </div>
                                        <div class="ml-3"
                                             style="cursor:pointer;">
                                            @if($message->hidden)
                                                <i class="fas fa-eye"
                                                   wire:click="unHideComment({{ $message->id }})"></i>
                                            @else
                                                <i class="fas fa-eye-slash"
                                                   wire:click="hideComment({{ $message->id }})"></i>
                                            @endif
                                        </div>
                                    @else
                                        @if ($message->account_id == Auth::guard('account')->id())
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        id="commentOptions"
                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    <i class="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="commentOptions">
                                                    <a class="dropdown-item" data-bs-toggle="modal"
                                                       data-bs-target="#editCommentModal"
                                                       wire:click="$dispatchTo('edit-comment', 'openModal', { commentId: {{ $message->id }}})"><i
                                                            class="fas fa-edit"
                                                        ></i> {{ __('bug_report')['edit_comment'] }}
                                                    </a>
                                                </div>
                                            </div>
                                        @endif
                                        <div class="ml-3"
                                             style="cursor:pointer;">
                                            @if($message->hidden)
                                                <i class="fas fa-eye" id="commentVisibility-{{ $message->id }}"
                                                   onclick="toggleCommentVisibility({{ $message->id }})"></i>
                                            @else
                                                <i class="fas fa-eye-slash" id="commentVisibility-{{ $message->id }}"
                                                   onclick="toggleCommentVisibility({{ $message->id }})"></i>
                                            @endif
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="chat-body text-dark-white @if($message->hidden) hidden @endif"
                                 id="commentBody-{{ $message->id }}">
                                <p class="pl-2 markdown-content" wire:ignore>{!! nl2br(e($message->message)) !!}</p>
                                @if ($message->image)
                                    <div class="image-container mt-2">
                                        <img src="{{ url($message->image->thumbnail) }}" class="img-fluid"
                                             alt="Comment image"
                                             onclick="openModal('{{ url($message->image->large) }}')"
                                             style="cursor: pointer; border-radius: 10px" data-bs-toggle="modal"
                                             data-bs-target="#lightbox">
                                    </div>
                                @endif
                            </div>
                        </li>
                        @if (!$loop->last)
                            <div class="vertical-line ml-5"></div>
                        @endif

                    @empty
                        <li class="list-group-item text-dark-white">{{ __('bug_report')['no_comments'] }}</li>
                    @endforelse
                    @if($bugTracker->statuses->name_localized == 'Closed' && !is_null($closedBy))
                        <div class="vertical-line ml-5"></div>
                        <li class="text-dark-white chat-container p-3"
                            style="background: transparent !important;">

                            <i class="fas fa-circle-dot"
                               style="font-size: small; color: {{ $bugTracker->statuses ? $bugTracker->statuses->color : 'var(--green)' }}; margin-right: 0.6rem;"></i>
                            <span>{{ $closedBy }} {{ __('bug_tracker')['closed_this_report'] }}</span>
                        </li>
                    @endif
                </ul>
            </div>
            @livewire('edit-comment')


            @if ($canPostMessage && !$needAuthorName && !$needToChangeAuthorName)
                <form>
                    <div class="mb-3">
                        <label for="commentTextarea"
                               class="form-label text-dark-white">{{ __('bug_report')['bug_details']['add_comment'] }}</label>
                        <textarea class="form-control mt-2" id="commentTextarea" rows="3" name="newMessage"
                                  wire:model.live="newMessage"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="commentImageUpload" class="form-label text-dark-white">
                            {{ __('bug_tracker')['upload_image'] }}
                        </label>
                        <div class="custom-file-upload">
                            <label for="commentImageUpload" class="btn btn-secondary">Browse</label>
                            <input type="text" class="form-control file-display-area normal-font"
                                   style="margin-bottom: 0; font-size: 14px;"
                                   readonly
                                   placeholder="No file selected. {{ __('bug_tracker')['you_can_upload_one_image'] }}">
                            <input type="file" id="commentImageUpload" name="commentImage" wire:model="commentImage"
                                   accept="image/*" class="file-input"
                                   style="opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer;">
                        </div>
                        @error('commentImage')
                        <div class="alert alert-warning">{{ $message }}</div>
                        @enderror
                        @if ($commentImage)
                            <img src="{{ $commentImage->temporaryUrl() }}" width="150px" height="150px">
                        @endif
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary"
                                wire:click.prevent="submitNewMessage"
                                wire:loading.remove
                                wire:target="submitNewMessage, commentImage">{{ __('bug_report')['bug_details']['submit_comment'] }}</button>
                    </div>
                </form>
            @endif
            @if ($canPostMessage && $needAuthorName)
                {{--
                                <h3 class="mt-3 mb-3 text-white">{{ __('bug_tracker')['pick_author_name'] }}</h3>
                --}}

                <form wire:submit.prevent="submitNewAuthorName">
                    <div class="mb-3">
                        <label for="characterSelect"
                               class="form-label text-dark-white">{{ __('bug_tracker')['select_author_name'] }}</label>
                        <div class="dropdown mt-1">
                            @error('selectedCharacterName')
                            <div class="alert alert-warning">{{ $message }}</div> @enderror
                            <select class="form-control w-75" wire:model="characterKey">
                                <option value="none">{{ __('bug_tracker')['select_character'] }}</option>
                                @forelse($charactersName as $key => $value)
                                    <option value="{{ $key }}">{{ $value['name'] }}</option>
                                @empty
                                    <option value="none">{{ __('bug_tracker')['no_character'] }}</option>
                                @endforelse
                            </select>

                        </div>
                        @error('characters')
                        <div class="alert alert-warning">{{ $message }}</div> @enderror
                    </div>
                    <button type="submit"
                            class="btn btn-primary" wire:loading.remove>{{ __('button')['submit'] }}</button>
                </form>
            @endif
            @if (!$canPostMessage)
                <div class="mt-3 text-white">{{ __('bug_tracker')['you_need_to'] }} <a
                        href="{{ route('login') }}"
                        style="margin: 0 !important; color: var(--orange) !important;">{{ __('header')['login'] }}</a> {{ __('bug_tracker')['in_order_to'] }}
                </div>
            @endif
            @if ($support)
                <div class="mb-3 mt-5">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['bug_details']['report_history'] }}</h5>

                    <textarea class="form-control text-dark-white" id="historyTextarea" rows="3" name="history"
                              style="background: var(--gray-bg); font-size: 14px;" readonly
                              wire:model="history"></textarea>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-danger mb-5" data-bs-toggle="modal"
                            data-bs-target="#deleteReportModal">
                        <i class="fas fa-trash-alt"></i> {{ __('bug_report')['delete_report'] }}
                    </button>
                </div>
                <div class="modal fade" id="deleteReportModal" tabindex="-1" aria-labelledby="deleteReportModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content text-white">
                            <div class="modal-header">
                                <h5 class="modal-title"
                                    id="deleteReportModalLabel">{{ __('bug_report')['delete_report'] }}</h5>
                                <button type="button" class="text-white close" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    x
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>{{ __('bug_report')['action_is_permanent'] }}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger"
                                        wire:click="deleteReport">{{ __('button')['yes'] }}</button>
                                <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">{{ __('button')['no'] }}</button>

                            </div>
                        </div>
                    </div>
                </div>
            @endif

        </div>

        <div style="max-width: 16rem">
            @if (Auth::guard('account')->check())
                <div class="border-bottom-light-gray p-3">

                    <div
                        class="text-dark-white mb-2 normal-font">{{ __('bug_tracker')['voted_for_fixing'] }} {{ $bugTracker->votes->count() }}</div>

                    @if($hasVoted)
                        <button class="btn btn-outline-gold" wire:click="unVote" wire:loading.remove>
                            <i class="fa fa-arrow-down"></i> {{ __('bug_tracker')['undo_vote'] }}
                        </button>
                    @else
                        <button class="btn btn-outline-gold" wire:click="vote" wire:loading.remove>
                            <i class="fa fa-arrow-up"></i> {{ __('bug_tracker')['vote_for_fixing'] }}
                        </button>
                    @endif

                </div>
            @endif
            <div id="changeBanForm" class="p-3 border-bottom-light-gray">

                <h5 class="text-dark-white mb-3">{{ __('bug_report')['status'] }}</h5>


                <span class="badge mb-2"
                      style=" border: 1px solid {{ $status['color'] }}; color: {{ $status['color'] }};">{{ $this->status->name_localized }}</span>

                <div class="text-gray mb-2">
                <span
                    class="bug-updated normal-font">{{ __('bug_report')['opened'] }} {{ $bugTracker->created_at->format('H:i d/m/Y') }}</span>
                    <span
                        class="bug-author normal-font">{{ __('bug_report')['author'] }}: {{ $bugTracker->author }}</span>
                </div>
                @if ($support)
                    <div class="d-flex align-items-baseline justify-content-between normal-font">
                        @if ($this->status->name_localized == "Closed")
                            <button type="button" class="btn btn-sm align-self-center w-100 green-btn"
                                    wire:click="toggleStatus">
                                Open
                            </button>
                        @else
                            <button type="button" class="btn btn-sm align-self-center w-100 red-btn"
                                    wire:click="toggleStatus">
                                Close
                            </button>
                        @endif
                    </div>
                @endif

            </div>
            @unless(collect($categories)->where('selected', true)->isEmpty() && !$support && !$owner)
                <div id="changeBanForm" class=" p-3 border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_tracker')['categories'] }}</h5>
                    @forelse($categories as $category)
                        @if ($category['selected'])
                            <span class="badge mb-2 flair-badge"
                                  style="border: 1px solid {{ $category['color'] }}; color: {{ $category['color'] }}; ">{{ $category['name'] }}</span>
                        @endif
                    @empty
                    @endforelse
                    @if ($support)
                        {{-- @if($openSearch)
                             <div wire:click="resetSearch"
                                  style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
                         @endif--}}
                        <div class="flex-column normal-font" style="position: relative; z-index: 99999;" id="category">
                            <div class="d-flex align-items-center mb-2">
                                <div class="dropdown" wire:keydown.arrow-down.prevent="incrementSelectedItem"
                                     wire:keydown.arrow-up.prevent="decrementSelectedItem"
                                     wire:keydown.enter.prevent="toggleSelection">
                                    <input type="text"
                                           class="form-control dropdown-toggle" id="categorySearchInput"
                                           wire:model="searchCategory" wire:keydown="renderSearchCategory"
                                           wire:keydown.escape="resetSearch"
                                           wire:click="renderSearchCategory"
                                           placeholder="{{ __('Select Category') }}"
                                           style="border-radius: 0; margin-bottom: 0; width: unset; border: 1px solid rgba(50, 50, 50);">
                                    <div class="dropdown-menu"
                                         @if($openSearch) style="display: block;" @endif>
                                        @forelse($searchCategories as $key => $category)
                                            <div
                                                class="dropdown-item d-flex align-items-center {{ $loop->index === $selectedItemIndex ? 'active' : '' }}"
                                                wire:key="category_{{ $key }}">
                                                <label class="w-100 m-0">
                                                    <input type="checkbox" class="mr-2" value="{{ $key }}"
                                                           wire:model="categories.{{ $key }}.selected">
                                                    {{ $category['name'] }}
                                                </label>
                                            </div>
                                        @empty
                                            <span
                                                class="dropdown-item text-dark-white">{{ __('No categories found') }}</span>
                                        @endforelse
                                    </div>
                                </div>
                                <div class="dropdown h-100">
                                    <button class="btn btn-secondary h-100" type="button"
                                            wire:click="{{ $openSearch ? 'clearSearch' : 'renderAllCategories' }}"
                                            id="categoriesDropdown">
                                        @if($openSearch)
                                            <i class="fa fa-times"></i>
                                        @else
                                            <i class="fa fa-angle-down"></i>
                                        @endif
                                    </button>

                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            @endunless

            @unless(collect($realms)->where('selected', true)->isEmpty() && !$support && !$owner)
                <div id="changeBanForm" class=" p-3  border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['realm'] }}</h5>
                    @forelse($realms as $realm)
                        @if ($realm['selected'])
                            <span class="badge mb-2 flair-badge"
                                  style="border: 1px solid red; color: red;">{{ $realm['name'] }}</span>
                        @endif
                    @empty
                    @endforelse
                    @if ($support || $owner)
                        <div class="d-flex align-items-baseline justify-content-between normal-font">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                        id="realmsDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    {{ __('bug_tracker')['select_realm'] }}
                                </button>
                                <div class="dropdown-menu text-white p-3" aria-labelledby="realmsDropdown">

                                    @forelse($realms as $key => $value)
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="{{ $key }}"
                                                   id="realm{{ $key }}" wire:model="realms.{{ $key }}.selected"
                                                   @if ($value['selected']) checked @endif>
                                            <label class="form-check-label" for="realm{{ $key }}">
                                                {{ $value['name'] }}
                                            </label>
                                        </div>
                                    @empty
                                    @endforelse
                                </div>
                            </div>
                            <button type="button" class="btn btn-sm btn-primary align-self-center"
                                    wire:click="modifyRealm">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['change_button'] }}</button>
                        </div>
                    @endif
                </div>
            @endunless

            @unless(collect($assignedTos)->where('selected', true)->isEmpty() && !$support && !$owner)
                <div id="changeBanForm" class="p-3  border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['assigned_to'] }}</h5>
                    @forelse($assignedTos as $assignedTo)
                        @if ($assignedTo['selected'])
                            <span class="badge mb-2"
                                  style="border: 1px solid {{ $assignedTo['color'] }}; color: {{ $assignedTo['color'] }}">{{ $assignedTo['name'] }}</span>
                        @endif
                    @empty
                    @endforelse
                    @if ($support)
                        <div class="d-flex align-items-baseline justify-content-between normal-font">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                        id="teamsDropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    {{ __('bug_tracker')['select_assigned_to'] }}
                                </button>
                                <div class="dropdown-menu text-white" aria-labelledby="teamsDropdown">

                                    @forelse($assignedTos as $key => $value)
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="{{ $key }}"
                                                   id="assignTo{{ $key }}" wire:model="assignedTos.{{ $key }}.selected"
                                                   @if ($value['selected']) checked @endif>
                                            <label class="form-check-label" for="team{{ $key }}">
                                                {{ $value['name'] }}
                                            </label>
                                        </div>
                                    @empty
                                    @endforelse
                                </div>
                            </div>
                            <button type="button" class="btn btn-sm btn-primary align-self-center"
                                    wire:click="modifyTeam">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['change_button'] }}</button>
                        </div>
                    @endif
                </div>
            @endunless
            @if($bugTracker->linkedBy->isNotEmpty())
                <div class="p-3  border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['bug_details']['linked_by'] }}</h5>
                    <div class="d-flex flex-column">
                        @forelse($bugTracker->linkedBy as $linkedBug)
                            <a href="{{ route('bug-report', ['id' => $linkedBug->id]) }}"
                               class="text-break">#{{ $linkedBug->id }} {{ $linkedBug->title }}</a>
                        @empty
                        @endforelse
                    </div>
                </div>
            @endif
            @if($bugTracker->relatedBugs->isNotEmpty())
                <div class="p-3  border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['bug_details']['related_reports'] }}</h5>
                    <div class="d-flex flex-column">
                        @forelse($bugTracker->relatedBugs as $relatedBug)
                            <a href="{{ route('bug-report', ['id' => $relatedBug->id]) }}"
                               class="text-break">#{{ $relatedBug->id }} {{ $relatedBug->title }}</a>
                        @empty
                        @endforelse
                    </div>
                </div>
            @endif
            @if($bugTracker->duplicatedBugs->isNotEmpty())
                <div class="p-3  border-bottom-light-gray">
                    <h5 class="text-dark-white mb-3">{{ __('bug_report')['bug_details']['duplicated_reports'] }}</h5>
                    <div class="d-flex flex-column">
                        @forelse($bugTracker->duplicatedBugs as $duplicatedBug)
                            <a href="{{ route('bug-report', ['id' => $duplicatedBug->id]) }}"
                               class="text-break">#{{ $duplicatedBug->id }} {{ $duplicatedBug->title }}</a>
                        @empty
                        @endforelse
                    </div>
                </div>
            @endif

        </div>
        @if ($support)
            @livewire('link-issue-form', ['bugTrackerId' => $bugTracker->id])
        @endif

        <div class="modal fade" id="lightbox" tabindex="-1" aria-labelledby="lightboxLabel" aria-hidden="true"
             style="z-index: 999999">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-body p-0">

                        <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                        <img src="" class="w-100">

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{--
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
--}}

<script type="module">
    document.addEventListener('DOMContentLoaded', () => {
        const linkButton = document.querySelector('.add-link-button'); // Dodajte klasu .add-link-button na vaš div
        if (linkButton) {
            linkButton.addEventListener('click', addNewLinkField);
        }
    });

    function addNewLinkField() {
        const form = document.getElementById('linkIssueForm');
        const newInputGroup = document.createElement('div');
        newInputGroup.className = 'form-group';
        newInputGroup.innerHTML = `
            <input type="text" class="form-control mt-2" placeholder="Search for another report">
        `;
        form.appendChild(newInputGroup);
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.markdown-content').forEach(function (element) {
            let markdownContent = element.innerText;

            markdownContent = markdownContent.replace(/#(\d+)/g, function (match, id) {
                return `<a href="{{ route('bug-report') }}?id=${id}" target="_blank">${match}</a>`;
            });

            marked.setOptions({
                breaks: true
            });

            const htmlContent = marked.parse(markdownContent);

            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(htmlContent, 'text/html');

            parsedHtml.querySelectorAll('a').forEach(function (link) {
                link.setAttribute('target', '_blank');
            });

            const finalHtml = parsedHtml.body.innerHTML;

            element.innerHTML = finalHtml;
        });
    });

    window.addEventListener('DOMContentLoaded', () => {
        tinymce.init({
            selector: '#descriptionTextarea',
            plugins: ['advlist', 'autolink', 'link', 'code',
                'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'fullscreen', 'insertdatetime', 'wordcount', 'emoticons'
            ],
            toolbar: 'undo redo emoticons link code| formatpainter casechange blocks | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',

            link_default_target: '_blank',
            link_assume_external_targets: true,

            setup: function (editor) {
                editor.on('init change', function () {
                    editor.save();
                });
                editor.on('change', function () {
                @this.set('description', editor.getContent())
                    ;
                });
            },

            skin: false,
            content_css: false
        });
    });

    document.addEventListener('livewire:load', function () {
        const input = document.getElementById('commentImageUpload');
        const textarea = document.getElementById('fileDisplayArea');

        function setImage(file) {
        @this.set('commentImage', file)
            ;
        }

        input.addEventListener('dragover', (event) => event.preventDefault());
        input.addEventListener('drop', (event) => {
            event.preventDefault();
            if (event.dataTransfer.files.length) {
                setImage(event.dataTransfer.files[0]);
            }
        });

        textarea.addEventListener('dragover', (event) => event.preventDefault());
        textarea.addEventListener('drop', (event) => {
            event.preventDefault();
            if (event.dataTransfer.files.length) {
                setImage(event.dataTransfer.files[0]);
            }
        });

        input.addEventListener('paste', (event) => {
            if (event.clipboardData.files.length) {
                setImage(event.clipboardData.files[0]);
            }
        });

        textarea.addEventListener('paste', (event) => {
            if (event.clipboardData.files.length) {
                setImage(event.clipboardData.files[0]);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        var commentImageUpload = document.getElementById('commentImageUpload');
        if (commentImageUpload) {
            commentImageUpload.addEventListener('change', function () {
                if (this.files.length > 0) {
                    document.querySelector('.file-display-area').value = this.files[0].name;
                }
            });
        }

        document.addEventListener('click', function (event) {
            var categoryElement = document.getElementById('category');
            if (categoryElement) {
                var isClickInside = categoryElement.contains(event.target);
                if (@this.openSearch && !isClickInside) {
                @this.resetSearch()
                    ;
                }
            }
        });
    });


</script>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var backToListLink = document.getElementById('backToList');
        var referrer = document.referrer;

        if (referrer && referrer.includes(window.location.hostname)) {
            backToListLink.href = 'javascript:window.history.back();';
        } else {
            backToListLink.href = '{{ route('bug-tracker') }}';
        }
    });

    function toggleCommentVisibility(commentId) {
        var commentBody = document.getElementById('commentBody-' + commentId);
        commentBody.classList.toggle('hidden');

        var icon = document.getElementById('commentVisibility-' + commentId);
        if (commentBody.classList.contains('hidden')) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
</script>

