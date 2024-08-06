<div class="text-gray" style="font-size: 1.3rem">
    <div class="text-gray mb-3" style="font-size: 1.3rem">


        <div class="text-gray d-flex justify-content-between align-items-center search-div" style="font-size: 1.3rem">
            <div class="input-group mb-3 mt-3 w-50">
                <input type="text" class="form-control pl-3 border-brown h-100" id="search-bug-tracker"
                       wire:model="search" wire:keydown.enter="renderSearch" name="search"
                       placeholder="{{ __('bug_tracker')['search'] }}" maxlength="100"
                       aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-dark border-brown" type="button" wire:click="renderSearch"><i
                            class="fa fa-search"></i></button>
                </div>
            </div>

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle text-dark-white ml-3" type="button"
                        id="paginationDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {{ __('bug_tracker')['reports_per_page'] }}: {{ $paginationNumber }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="paginationDropdown">
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(10)">10</a></li>
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(20)">20</a></li>
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(30)">30</a></li>
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(40)">40</a></li>
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(50)">50</a></li>
                    <li><a class="dropdown-item" href="#" wire:click.prevent="setPaginationNumber(100)">100</a></li>
                </ul>
            </div>


            <div class="d-flex search-div-1200">

                <div class="d-flex align-items-center">
                    <div class="dropdown m-1">
                        <button class="btn btn-outline-gold dropdown-toggle" type="button" id="categoryDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: 20px">
                            {{ __('bug_tracker')['categories'] }}
                        </button>
                        <ul class="dropdown-menu dropdown-height" aria-labelledby="categoryDropdown">
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setFilterByCategory('0')"><span
                                        class="badge flair-badge"
                                        style="border: 1px solid var(--dark-white); color: var(--dark-white); font-size: 13px; margin-top: 5px;"
                                    >{{ __('bug_tracker')['all_categories'] }}</span></a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setFilterByCategory('none')"><span
                                        class="badge flair-badge"
                                        style="border: 1px solid var(--dark-white); color: var(--dark-white); font-size: 13px; margin-top: 5px;"
                                    >{{ __('bug_tracker')['no_category'] }}</span></a>
                            </li>
                            @forelse($categories as $category)
                                <li>
                                    <a class="dropdown-item"
                                       wire:click.prevent="setFilterByCategory('{{ $category->id }}')">
                                    <span class="badge flair-badge"
                                          style="border: 1px solid {{ in_array($category->id, $this->selectedCategories) ? $category->color : 'var(--dark-white)' }};
                                                 color: {{ in_array($category->id, $this->selectedCategories) ? $category->color : 'var(--dark-white)' }};
                                                 font-size: 13px; margin-top: 5px;">
                                        {{ $category->name_localized }}
                                    </span>
                                    </a>
                                </li>
                            @empty
                                <li><span class="dropdown-item">{{ __('bug_tracker')['no_categories'] }}</span></li>
                            @endforelse
                        </ul>
                    </div>
                    <div class="dropdown m-1">
                        <button class="btn btn-outline-gold dropdown-toggle" type="button" id="assignedToDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: 20px">
                            {{ __('bug_report')['assigned_to'] }}
                        </button>
                        <ul class="dropdown-menu dropdown-height" aria-labelledby="assignedToDropdown">
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setFilterByAssignedTo('0')"><span
                                        class="badge flair-badge"
                                        style="border: 1px solid var(--dark-white); color: var(--dark-white); font-size: 13px; margin-top: 5px;"
                                    >{{ __('bug_report')['all'] }}</span></a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setFilterByAssignedTo('none')"><span
                                        class="badge flair-badge"
                                        style="border: 1px solid var(--dark-white); color: var(--dark-white); font-size: 13px; margin-top: 5px;"
                                    >{{ __('bug_report')['not_assigned'] }}</span></a>
                            </li>
                            @forelse($assignedTo as $assigned)
                                <li>
                                    <a class="dropdown-item"
                                       wire:click.prevent="setFilterByAssignedTo('{{ $assigned->id }}')">
                                        <span class="badge flair-badge"
                                              style="border: 1px solid {{ in_array($assigned->id, $this->selectedAssignedTo) ? $assigned->color : 'var(--dark-white)' }};
                                                     color: {{ in_array($assigned->id, $this->selectedAssignedTo) ? $assigned->color : 'var(--dark-white)' }};
                                                     font-size: 13px; margin-top: 5px;">
                                            {{ $assigned->name_localized }}
                                        </span>
                                    </a>
                                </li>
                            @empty
                                <li><span class="dropdown-item">{{ __('bug_tracker')['no_assigned_to'] }}</span></li>
                            @endforelse
                        </ul>
                    </div>
                    <div class="dropdown m-1">
                        <button class="btn btn-outline-gold dropdown-toggle" type="button" id="sortDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: 20px" wire:ignore>
                            {{ __('bug_tracker')['sort_by'] }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setOrderBy('created_at')">{{ __('bug_tracker')['date_of_creation'] }}</a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setOrderBy('updated_at')">{{ __('bug_tracker')['date_of_last_update'] }}</a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setOrderBy('last_reply')">{{ __('bug_tracker')['latest_activity'] }}</a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setOrderBy('votes')">{{ __('bug_tracker')['top_rated'] }}</a>
                            </li>
                            <li><a class="dropdown-item"
                                   wire:click.prevent="setOrderBy('comments')">{{ __('bug_tracker')['number_of_comments'] }}</a>
                            </li>
                        </ul>
                    </div>
                    @if (Auth::guard('account')->check())
                        <a class="small m-1" data-bs-toggle="modal">
                            <button class="btn btn-outline-gold d-flex align-items-center report-button"
                                    wire:click="myReports"
                                    style="border-radius: 20px; white-space: nowrap;">
                                @if($isMyReports)
                                    <i class="fa fa-check mr-1"></i>
                                @endif{{ __('bug_tracker')['my_reports'] }}
                            </button>
                        </a>
                        <a class="small m-1" data-bs-toggle="modal">
                            <button class="btn btn-outline-gold d-flex align-items-center report-button"
                                    wire:click="myThreads"
                                    style="border-radius: 20px; white-space: nowrap;">
                                @if($isMyThreads)
                                    <i class="fa fa-check mr-1"></i>
                                @endif
                                {{ __('bug_tracker')['my_threads'] }}
                            </button>
                        </a>
                    @endif
                </div>
                <div class="d-flex">
                    <div class="dropdown m-1">
                        <button class="btn btn-outline-gold dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: 20px;"
                                wire:ignore>
                            <i class="fa fa-filter mr-1"></i> {{ __('bug_report')['related_reports_table']['status'] }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <a class="dropdown-item" wire:click="setFilter('open')">
                                    <i class="fa fa-hourglass-start mr-1"></i> {{ __('bug_tracker')['open_reports'] }}
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" wire:click="setFilter('closed')">
                                    <i class="fa fa-close mr-1"></i> {{ __('bug_tracker')['closed_reports'] }}
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" wire:click="setFilter('all')">
                                    <i class="fa fa-list mr-1"></i> {{ __('bug_tracker')['all_reports'] }}
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </div>
        {{--
                <div class="fa-pull-right">
                    <a class="small m-3" href=""> <i class="fa fa-fw fa-refresh text-green mb-3"></i>{{ __('bug_tracker')['reset'] }}
                    </a>
                </div>--}}
    </div>


    <div class="bug-reports">
        @forelse ($bugTrackers as $bugTracker)
            <div class="bug-report">
                <div class="bug-info">
                    @php
                        $badgeCount = count($bugTracker->categories) + count($bugTracker->assignedTo);
                    @endphp
                    <div class="text-dark-white d-flex align-items-start max-w-90">
                        <i class="fas fa-circle-dot"
                           style="font-size: small; color: {{ $bugTracker->statuses ? $bugTracker->statuses->color : 'var(--green)' }}; margin-right: 0.6rem; margin-top: 0.7rem"></i>
                        <div class="title-normal-font mr-2">
                            <div class="d-flex">
                                <a href="{{ route('bug-report', ['id' => $bugTracker->id]) }}"
                                   class="bug-report-link max-w-90">
                                    <div class="bug-title" style="max-width: {{ $badgeCount > 2 ? '25rem' : '35rem' }};
                                                                  overflow: hidden;
                                                                  text-overflow: ellipsis;
                                                                  white-space: nowrap;">
                                        {{ $bugTracker->title }}
                                    </div>
                                </a>

                                <div class="ml-2 disappear">
                                    @forelse($bugTracker->categories as $category)
                                        <span class="badge flair-badge hand"
                                              wire:click="setFilterByCategory('{{ $category->id }}')"
                                              style="border: 1px solid {{ $category->color }}; color: {{ $category->color }}; font-size: 13px; margin-top: 5px;">{{ $category->name_localized }}</span>
                                    @empty
                                    @endforelse
                                    @forelse($bugTracker->assignedTo as $singleAssignedTo)
                                        <span class="badge flair-badge"
                                              style="border: 1px solid {{ $singleAssignedTo->color }}; color: {{ $singleAssignedTo->color }}; font-size: 13px; margin-top: 5px;">{{ $singleAssignedTo->name_localized }}</span>
                                    @empty
                                    @endforelse</div>
                            </div>
                            <div class="bug-meta">
                                <span class="bug-id">#{{ $bugTracker->id }}</span>
                                @php
                                    $latestComment = $bugTracker->messages->sortByDesc('created_at')->first();
                                    $hasComments = $bugTracker->messages->count() > 0;
                                    $updatedByText = $hasComments ? "Updated {$latestComment->created_at->diffForHumans()} by {$latestComment->author} |" : '';
                                @endphp

                                @if ($updatedByText)
                                    <span class="bug-updated disappear">{{ $updatedByText }}</span>
                                @endif
                                <span class="bug-updated">Created {{ $bugTracker->created_at->diffForHumans() }}
                                    <span class="bug-author disappear">by {{ $bugTracker->author }}
                                        @if($bugTracker->votes->count() > 0)
                                            , {{ __('bug_tracker')['number_of_votes'] }}:
                                            <span class="normal-font">{{ $bugTracker->votes->count() }}</span>
                                        @endif
                                    </span>
                                </span>
                                {{--@if($bugTracker->messages->count() > 0)
                                    <span class="ml-2" style="color: var(--light)"><i
                                            class="fa fa-comment mr-1"></i>{{ $bugTracker->messages->count() }}</span>
                                @endif--}}
                            </div>
                        </div>

                    </div>
                    @php
                        $hasHighRankMessage = $bugTracker->messages->some(function ($message) {
                            return $message->account && $message->account->rank >= 2;
                        });
                    @endphp

                    @if($bugTracker->messages->count() > 0)
                        <span class="ml-2 comment-count" @if($hasHighRankMessage) style="color: var(--green);" @endif>
                            <i class="fa fa-comment mr-1"></i>{{ $bugTracker->messages->count() }}
                        </span>
                    @endif
                </div>
                {{--<div class="bug-meta">
                    <span class="bug-id">#{{ $bugTracker->id }}</span>
                    <span
                        class="bug-updated">Updated {{ $bugTracker->updated_at->format('H:i d/m/Y') }}</span>
                    <span class="bug-author">by {{ $bugTracker->author }}</span>
                    --}}{{--@if($bugTracker->messages->count() > 0)
                        <span class="ml-2" style="color: var(--light)"><i
                                class="fa fa-comment mr-1"></i>{{ $bugTracker->messages->count() }}</span>
                    @endif--}}{{--
                </div>--}}
            </div>
        @empty
        @endforelse

        <div class="my-custom-pagination mt-2">
            {{ $bugTrackers->links() }}
        </div>
    </div>

    {{--<script type="module">
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var toggleButtons = document.querySelectorAll('.toggle-icon');

            toggleButtons.forEach(function(button) {
                button.addEventListener('click', function () {
                    var arrowIcon = this.querySelector('.arrow-icon');
                    arrowIcon.classList.toggle('fa-long-arrow-alt-up');
                    arrowIcon.classList.toggle('fa-long-arrow-alt-down');
                });
            });
        });
    </script>--}}
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Update sort button text on item click
            var sortDropdownItems = document.querySelectorAll('#sortDropdown + .dropdown-menu .dropdown-item');
            sortDropdownItems.forEach(function (item) {
                item.addEventListener('click', function () {
                    var buttonText = this.textContent;
                    document.querySelector('#sortDropdown').textContent = buttonText;
                });
            });

            var statusDropdownItems = document.querySelectorAll('#dropdownMenuButton + .dropdown-menu .dropdown-item');
            statusDropdownItems.forEach(function (item) {
                item.addEventListener('click', function () {
                    var buttonText = this.textContent;
                    document.querySelector('#dropdownMenuButton').textContent = buttonText;
                });
            });
        });
    </script>

</div>
