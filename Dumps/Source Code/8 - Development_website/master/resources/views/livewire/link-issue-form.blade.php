<div class="modal fade" id="linkIssueModal" tabindex="-1" role="dialog" aria-labelledby="linkIssueModalLabel"
     aria-hidden="true" wire:ignore.self style="z-index: 99999">
    <div class="modal-dialog" role="document" style="max-width: 60rem">
        <div class="modal-content text-dark-white">
            <div class="modal-header" style="border: none">
                <h5 class="modal-title" id="linkIssueModalLabel">{{ __('bug_tracker')['link_an_issue'] }}</h5>

            </div>
            <div class="modal-body">
                <form id="linkIssueForm">
                    <div>
                        @foreach($forms as $index => $form)
                            <div class="d-flex align-items-center" wire:key="{{ $index }}">
                                <div class="form-group mr-2">
                                    <label for="issueType-{{ $index }}">{{ __('bug_tracker')['type_of_link'] }}</label>
                                    <select class="form-control search-form text-dark-white" id="issueType-{{ $index }}"
                                            wire:model="forms.{{ $index }}.type">
                                        <option value="duplicated">{{ __('bug_tracker')['duplicated'] }}</option>
                                        <option value="related">{{ __('bug_tracker')['related'] }}</option>
                                    </select>
                                </div>
                                {{-- @if($openSearch)
                                     <div wire:click="resetSearch"
                                          style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
                                 @endif--}}
                                <div class="form-group w-100">
                                    <label
                                        for="searchReport-{{ $index }}">{{ __('bug_tracker')['search_bug_reports'] }}</label>
                                    <input type="text" class="form-control search-form w-100"
                                           style="z-index: 99"
                                           id="searchReport-{{ $index }}"
                                           placeholder="{{ __('bug_tracker')['search'] }}"
                                           wire:model="forms.{{ $index }}.search"
                                           wire:keyup.debounce.300ms="searchBugReports({{ $index }})"
                                           wire:change="resetSearch">
                                    @if(isset($searchResults[$index]) && count($searchResults[$index]) > 0 && $openSearch)

                                        <ul class="custom-dropdown" style="z-index: 99">
                                            @foreach($searchResults[$index] as $result)
                                                <li wire:click="selectBugReport({{ $index }}, {{ $result['id'] }})"
                                                    wire:key="{{ $result['id'] }}">
                                                    <a class="hover-opacity">#{{ $result['id'] }} {{ $result['title'] }}
                                                        <span style="color: {{ $result['color'] }} !important;">[{{ $result['status'] }}]</span></a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </div>
                                <div>
                                    <button type="button" wire:click="removeForm({{ $index }})"
                                            class="btn btn-primary text-dark-white ml-1">{{ __('bug_tracker')['remove'] }}</button>
                                </div>
                            </div>
                        @endforeach
                        <div class="form-group">
                            <div class="text-dark-white hand" wire:click="addForm"><i
                                    class="fa fa-plus mr-1"></i> {{ __('bug_tracker')['link_another_issue'] }}</div>
                        </div>
                        @if ($successMessage)
                            <div class="alert alert-success" id="successMessage">
                                {{ $successMessage }}
                            </div>
                        @endif
                        <button wire:click.prevent="saveLinkedBugs"
                                class="btn btn-primary">{{ __('gm_ban_appeals_page')['gm_ban_appeals_modal']['save'] }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
