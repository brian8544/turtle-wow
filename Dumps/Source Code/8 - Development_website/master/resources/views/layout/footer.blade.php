@dynamicContent('footer')
<div class="section mb-5" id="footer">
    <div class="container-fluid">
        <div class="container">

            <p class="m-auto w-75">
                @sectionContent('footer.text')
            </p>

            <Br>
            <Br>

            @php
                $visitorCountry = isset($_SERVER['HTTP_CF_IPCOUNTRY']) ? $_SERVER['HTTP_CF_IPCOUNTRY'] : null;
            @endphp

            @if(!request()->is('radio'))
                <a href="{{ route('rules') }}" target="_blank"
                   class="orange-text">{{ __('footer')['server_rules_and_terms_of_use'] }}</a>
             {{--   @if (config('app.web_env') == "EN")
                    <p style="opacity: 50%; margin-bottom: 0" class="col">GAMETTI LTD, Registration No.
                        14348659</p>
                    <p style="opacity: 50%; margin-bottom: 0" class="col">2nd Floor, College House, 17 King Edwards
                        Road,
                        Ruislip, London</p>
                @endif--}}
                @if ($visitorCountry != "RU" && $visitorCountry != "UA")
                    <p style="cursor: pointer;opacity: 50%" data-bs-toggle="modal" class="col"
                       data-bs-target="#legalInformation">{{ __('footer')['legal_information'] }}</p>
                @endif
            @endif
        </div>
    </div>
    <div class="modal fade" id="lightbox" tabindex="-1" aria-labelledby="lightboxLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">

                    <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                    <img src="" class="w-100" alt="TurtleWoW Modal Picture">

                </div>
            </div>
        </div>
    </div>
</div>
