@include('layout.head')

@vite(['resources/js/tinymce.js'])

<body>

<div class="container ucp pl-5 pr-5" style="width: 100%">
    <div class="mt-3">
        <a class="mt-5" href="{{ route('bug-tracker') }}"> <i
                class="fa fa-fw fa-arrow-left"></i> {{ __('bug_report')['back_to_list'] }}</a>

    </div>
    <h3 class="m-3 text-white">{{ __('bug_tracker')['new_bug_report'] }}</h3>

    @livewire('new-bug-report')
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var dropdowns = document.querySelectorAll('.dropdown-menu');

        dropdowns.forEach(function (dropdown) {
            dropdown.addEventListener('click', function (e) {
                if (dropdown.classList.contains('dropdown-menu-form')) {
                    e.stopPropagation();
                }
            });

            var checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
            var dropdownButton = dropdown.closest('.dropdown').querySelector('.dropdown-toggle');

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    var selectedOptions = [];
                    checkboxes.forEach(function (checkbox) {
                        if (checkbox.checked) {
                            selectedOptions.push(checkbox.nextElementSibling.textContent.trim());
                        }
                    });

                    if (selectedOptions.length > 0) {
                        dropdownButton.textContent = selectedOptions.join(', ');
                    } else {
                        dropdownButton.textContent = 'Select';
                    }

                    console.log(selectedOptions);
                });
            });
        });
    });
</script>

@include('layout.dependency')

@include('layout.script')
</body>
</html>
