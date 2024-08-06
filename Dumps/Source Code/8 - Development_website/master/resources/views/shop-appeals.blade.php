@include('layout.head')

<body>

@livewire('shop-appeals-table')

@livewire('shop-appeals-modal')

@include('layout.dependency')

@include('layout.script')
<script type="module">
    function switchToTabFromHash() {
        var hash = window.location.hash;
        if (hash) {
            var tabId = hash.substring(1);
            var tab = document.getElementById(tabId);
            if (tab) {
                tab.click();
            }
        }
    }
    window.addEventListener('load', switchToTabFromHash);
    Livewire.on('messageSent', () => {
        setTimeout(function() {
            scrollMessageHistoryToBottom();
        }, 100);
    });
    $(document).ready(function() {
        var maxCharacters = 1024;

        $('#newMessage').on('input', function() {
            var currentCharacters = $(this).val().length;
            var remainingCharacters = maxCharacters - currentCharacters;
            $('#character-count').text(remainingCharacters);
        });
    });

    function scrollMessageHistoryToBottom() {
        var messageHistory = document.getElementById('messageHistory');
        var lastMessage = messageHistory.lastElementChild;

        if (lastMessage) {
            lastMessage.scrollIntoView();
        }
    }

    $('#shopAppealRespondModal').on('shown.bs.modal', function () {
        scrollMessageHistoryToBottom();
    });
</script>
</body>
</html>
