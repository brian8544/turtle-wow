@include('layout.head')

@vite(['resources/js/tinymce.js'])

@php
    $support = false;
    $user = auth()->guard('account')->user();

    if ($user) {
        if ($user->rank >= 2) {
            $support = true;
        }
    }
@endphp

@include('layout.header')

<body>

<div class="container ucp pl-5 pr-5 pt-5 bug-tracker" style="width: 100%">
    <div class="d-flex align-items-center search-div admin-options">
        <h3 class="m-3 text-white">
            <a href="{{ route('bug-tracker') }}" style="color: white !important;">{{ __('bug_tracker')['bug_tracker'] }}</a>
        </h3>

        {{--<a class="small m-3" data-bs-toggle="modal"
           data-bs-target="#newReportModal" style="background: grey"
           wire:click="$dispatchTo('new-report', 'openModal')">
            <button class="btn btn-outline-success" style="border-radius: 20px"><i
                    class="fa fa-fw fa-plus"></i>{{ __('bug_tracker')['new_report'] }}
            </button>
        </a>--}}
        @if ($support)
            <a class="small m-3" data-bs-toggle="modal"
               data-bs-target="#statusModal" style="background: grey"
               wire:click="$dispatchTo('modify-status', 'openModal')">
                <button class="btn btn-outline-gold" style="border-radius: 20px"><i class="fa fa-fw fa-plus"></i>
                    {{ __('bug_tracker')['modify_statuses'] }}

                </button>
            </a>
            <a class="small m-3" data-bs-toggle="modal"
               data-bs-target="#categoryModal" style="background: grey"
               wire:click="$dispatchTo('modify-category', 'openModal')">
                <button class="btn btn-outline-gold" style="border-radius: 20px"><i
                        class="fa fa-fw fa-plus"></i>{{ __('bug_tracker')['modify_categories'] }}
                </button>
            </a>
            <a class="small m-3" data-bs-toggle="modal"
               data-bs-target="#priorityModal" style="background: grey"
               wire:click="$dispatchTo('new-priority', 'openModal')">
                <button class="btn btn-outline-gold" style="border-radius: 20px"><i
                        class="fa fa-fw fa-plus"></i>{{ __('bug_tracker')['modify_priorities'] }}
                </button>
            </a>
            <a class="small m-3" data-bs-toggle="modal"
               data-bs-target="#teamModal" style="background: grey"
               wire:click="$dispatchTo('new-teams', 'openModal')">
                <button class="btn btn-outline-gold" style="border-radius: 20px"><i
                        class="fa fa-fw fa-plus"></i>{{ __('bug_tracker')['modify_teams'] }}
                </button>
            </a>
        @endif
    </div>

    <div class="text-dark-white ml-3 disappear normal-font">
        {{ __('bug_tracker')['before_submitting'] }}
    </div>

    @livewire('bug-tracker-table')
    @if ($support)
        @livewire('modify-status')
        @livewire('modify-category')
        @livewire('modify-priority')
        @livewire('modify-teams')
    @endif
    @livewire('new-bug-report')


@include('layout.dependency')

@include('layout.script')

</body>
</html>


