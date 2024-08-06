@dynamicContent('donate')

<div class="container-fluid pt-1">
    <div class="container pt-5">
        <div class="row p-5 mt-5">
            <div class="col-lg-6">
                @sectionContent('donate.row.1.column.1')
            </div>
            <div class="col-lg-6">
                <div class="shield text-center">
                    <p class="sum">{{ $user->shopCoins?->coins }}</p>
                    <p class="text">{{ __('page_donate')['tokens'] }}</p>
                </div>
            </div>

            <div class="col-lg-6 bg-dark-gray p-3">
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 30
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 7.5%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        323
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 40
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 10%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        440
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 50
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 12.5%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        563
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 60
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 15%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        690
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 70
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 17.5%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        823
                    </div>
                </div>
            </div>

            <div class="col-lg-6 bg-dark-gray p-3">
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 80
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 20%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        960
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 90
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 22.5%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        1103
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 100
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 25%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        1250
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 200
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 40%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        2800
                    </div>
                </div>
                <div class="dono ng-scope">
                    <div class="d-inline-block text-white ng-binding" style="width: 70px;">
                        <span class="orange-text">€</span> 300
                    </div>
                    <div class="d-inline-block text-right text-gray ng-binding" style="width: 80px; "> + 40%</div>
                    <div class="d-inline-block text-center text-gray" style="width: 70px; "> ⟶</div>
                    <div class="d-inline-block text-center text-white ng-binding" style="width: 100px; "><img
                            alt="Turtle Icon Small"
                            class="mr-1" src="{{ Vite::asset('resources/images/icon_turtle_small.png') }}">
                        4200
                    </div>
                </div>
            </div>

            <div class="col-lg-12 mt-5 mb-3">
                <p class="text-white w-100">
                    {{ __('page_donate')['want_help'] }}
                </p>
            </div>

            @if (config('customs.donation.gamepoints.enabled'))
                <div class="col-lg-4 text-gray2 text-left hand" data-bs-toggle="collapse" data-bs-target="#collapseGp">
                    <img alt="Gamepoints" src="{{ Vite::asset('resources/images/buttongamepoints.png') }}"
                         class="w-100">
                    <p class="mt-3">&nbsp;</p>
                </div>
            @endif

            @if (config('customs.donation.paymentwall.enabled'))
                <div class="col-lg-4 text-gray2 text-left hand" data-bs-toggle="collapse" data-bs-target="#collapsePw">
                    <img alt="Paymentwall"
                         src="{{ config('app.web_env') == 'CN' ? Vite::asset('resources/images/ButtonWeChatPay.png') : Vite::asset('resources/images/buttonpaymentwall.png') }}"
                         class="w-100">
                    <p class="mt-3">&nbsp;</p>
                </div>
            @endif

            @if (config('customs.donation.enot.enabled'))
                <div class="col-lg-4 text-gray2 text-left hand" data-bs-toggle="collapse"
                     data-bs-target="#collapseEnot">
                    <img alt="Enot" src="{{ Vite::asset('resources/images/enot_card.jpg') }}" class="w-100">
                    <p class="mt-3">&nbsp;</p>
                </div>
            @endif

            @if (config('customs.donation.paypal.enabled'))
                <div class="col-lg-4 text-gray2 text-center hand" data-bs-toggle="collapse"
                     data-bs-target="#collapsePaypal">
                    <img alt="PayPal" src="{{ Vite::asset('resources/images/buttonpaypal.png') }}" class="w-100">
                    <p class="mt-3">&nbsp;</p>
                </div>
            @endif

            @if (config('customs.donation.boosty.enabled'))
                <div class="col-lg-4 text-gray2 text-center hand" data-bs-toggle="collapse"
                     data-bs-target="#collapseBoosty">
                    <img alt="Boosty" src="{{ Vite::asset('resources/images/buttonboosty.png') }}" class="w-100">
                    <p class="mt-3">
                    </p>
                </div>
            @endif

            @if (config('customs.donation.btcPay.enabled'))
                <div class="col-lg-4 text-gray2 text-left hand" data-bs-toggle="collapse"
                     data-bs-target="#collapseBtcPay">
                    <div class="card">
                        <div class="card-content">
                            <img src="{{ Vite::asset('resources/images/btc-pay.webp') }}" alt="BTC Pay Logo" class="logo" style="margin-bottom: 0">
                            <div class="sub-card d-flex justify-content-end">
                                <img src="{{ Vite::asset('resources/images/bitcoin.webp') }}" alt="BTC Pay Logo" class="logo">
                                <img src="{{ Vite::asset('resources/images/lite.webp') }}" alt="BTC Pay Logo" class="logo">
                                <img src="{{ Vite::asset('resources/images/dash-logo.webp') }}" alt="BTC Pay Logo" class="logo">
                            </div>
                            <div class="label">+15%</div>
                        </div>
                    </div>
                    <p class="mt-3">&nbsp;</p>
                </div>
            @endif

            @if (config('customs.donation.gamepoints.enabled'))
                <div class="col-lg-12 collapse @if ($showGp) show @endif" id="collapseGp" wire:ignore.self>
                    <div class="gp_container">
                        <div class="col-lg-6">
                            <p class="text-white">{{ __('page_donate')['purchase_code'] }}</p>
                            <a class="gp_link wtf_its_shit_rule"
                               href="{{ config('customs.donation.gamepoints.offer_url') }}" target="_blank"></a>
                        </div>
                        <div class="col-lg-6">
                            <p class="text-white">{{ __('page_donate')['redeem_the_code'] }}</p>
                            <input type="text" class="form-control" wire:model.defer="gpCode" name="gpCode"/>
                            @error('gpCode')<p class="gp_error">{{ $message }}</p>@enderror
                            @if ($messageGamePoints)
                                <p class="gp_error">{{ $messageGamePoints }}</p>
                            @endif
                            <div class="btn-gp hand" wire:click="useGamePoints" wire:loading.remove></div>
                        </div>
                    </div>
                </div>
            @endif

            @if (config('customs.donation.paymentwall.enabled'))
                <div class="col-lg-12 collapse @if ($showPw) show @endif" id="collapsePw">
                    @sectionContent('donate.wechat.mint')
                    <iframe src="{{ $pwUrl }}" width="100%" height="750px" frameborder="0" id="pw-iframe"></iframe>
                </div>
            @endif

            @if (config('customs.donation.enot.enabled'))
                <div class="col-lg-12 mt-4 collapse @if ($showEnot) show @endif" id="collapseEnot" wire:ignore.self>
                    <form method='get' action='https://enot.io/pay' class="enot_form">
                        <input type="hidden" name="m" value="{{ config('customs.donation.enot.merchant_id') }}"/>
                        <input type="hidden" name="o" value="{{ time() }}"/>
                        <input type="hidden" name="cf" value="{{ $enotUserIdEnotPoints }}"/>
                        <input type="hidden" name="s" value="{{ $enotSign }}"/>
                        <input type="number" wire:model.live.debounce.800ms="enotPrice"
                               class="form-control col-lg-3"/>
                        <input type="hidden" value="{{ $enotPriceUpdated }}" name="oa"/>
                        <div class="currency"><span class="orange-text"> € </span></div>
                        <div class="enot_result_conversion col-lg-3">
                            {{ $enotPoints }} {{ __('page_donate')['tokens'] }}
                        </div>
                        <input type="submit" class="btn btn-primary btn-enot col-lg-2"
                               value="{{ __('header')['donate'] }}">
                    </form>
                </div>
            @endif

            @if (config('customs.donation.paypal.enabled'))
                <div class="col-lg-12 text-white collapse @if ($showPaypal) show @endif" id="collapsePaypal">
                    @sectionContent('donate.paypal')
                </div>
            @endif

            @if (config('customs.donation.boosty.enabled'))
                <div class="col-lg-12 text-white collapse @if ($showBoosty) show @endif" id="collapseBoosty">
                    @sectionContent('donate.boosty')
                </div>
            @endif

            @if (config('customs.donation.btcPay.enabled'))
                <div class="col-lg-12 mt-4 collapse @if ($showBtcPay) show @endif" id="collapseBtcPay" wire:ignore.self>
                    <div class="enot_form">
                        <input type="number" wire:model.live.debounce.800ms="btcPayPrice" class="form-control col-lg-3"/>
                        <div class="currency"><span class="orange-text"> € </span></div>
                        <div class="enot_result_conversion">
                            {{ $btcPayPoints }} {{ __('page_donate')['tokens'] }}
                            <span class="bonus-text">+{{ (config('customs.donation.btcPay.bonusPercent') - 1) * 100 }}%</span>
                            <span class="arrow">→</span>
                            <span class="final-points">{{ $btcPayPointsWithBonus }}</span> {{ __('page_donate')['tokens'] }}
                        </div>
                        <button class="btn btn-enot col-lg-2" wire:click="generateBtcPayRedirect">{{ __('header')['donate'] }}</button>
                    </div>
                </div>
            @endif

            <img alt="Footerline" src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-3 mb-4 w-100">

        </div>

        <div wire:loading.delay>
            @livewire('loader-component')
        </div>
    </div>

    <div class="container p-5" id="thanks">

        <img alt="Footerline" src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-5 mb-4 w-100">

        @sectionContent('donate.thanks')
        {!! $message !!}

        <img alt="Footerline" src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-3 mb-5 w-100">

    </div>
</div>
