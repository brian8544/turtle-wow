var THEME = THEME || {};

(function(jQuery) {

    "use strict";

    THEME.initialize = {

        init: function() {
            THEME.initialize.general();
            THEME.initialize.removeHashFragment();
        },

        general: function() {
            window.addEventListener('analytic-register-new-user', (event) => {
                const page = event?.detail?.page;

                if (!page) {
                    return;
                }

                _paq.push([
                    'trackEvent',
                    'Account',
                    'New',
                    page
                ]);
            })

            window.addEventListener('analytic-log-out-user', event => {
                _paq.push(['resetUserId']);
                _paq.push(['appendToTrackingUrl', 'new_visit=1']);
                _paq.push(['trackPageView']);
                _paq.push(['appendToTrackingUrl', '']);
            })


            function openModal(imageSrc) {
                $('#lightbox img').attr('src', imageSrc);
            }

            window.openModal = openModal;
        },

        removeHashFragment: function() {
            var url = window.location.href;
            if (url.includes('/#/')) {
                var urlWithoutFragment = url.replace('/#/', '/');
                window.location.href = urlWithoutFragment;
            }
        }
    };

    THEME.documentOnReady = {
        init: function() {
            THEME.initialize.init();
        },
    };

    $(document).ready(THEME.documentOnReady.init);


})($);

