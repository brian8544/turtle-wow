<div class="container-lg pt-5 pb-5">
    <div class="row p-5">

        <div class="col-lg-9 mb-3">
            <h2 class="orange-text mb-4 hand" onclick="window.location='{{ route('watch') }}'">Turtle TV</h2>
            <p class="text-gray2">Turtle WoW is always looking to expand the Warcraft universe, be it with
                soundtracks, custom zones, or even dungeons!<Br>Our trailers and media for everything we do can be
                found here.</p>
        </div>
        {{--<div class="col-lg-3 watch-search">
            <form>
                <input type="text" ng-model="searchQuery" class="form-control" placeholder="Search"
                       name="searchChannel" id="searchChannel">
            </form>
        </div>--}}
    @switch($view)
        @case ('channel')


                <div class="col-lg-12 mb-5">

                    <h3 class="">{{ $channels[0]['name'] }}</h3>

                    <img alt="Footer Line" src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-2 mb-4 w-100">

                    <div class="row">
                        @forelse($channels[0]['videos'] as $video)
                            @livewire('video-thumb', ['id' => $video['id'], 'thumb' => $video['thumb'], 'title' => $video['title'], 'duration' => $video['duration'], 'views' => $video['views'], 'comments' => $video['commentsCount'], 'ago' => $video['ago'], 'url' => $video['url']])
                        @empty
                        @endforelse
                    </div>
                </div>

        @break
        @case ('moderation')
            <div class="row p-5">

                <div class="col-lg-9 mb-3">
                    <h2 class="orange-text mb-4 hand" ng-if="!nothing">Moderation</h2>
                    <h2 class="orange-text mb-4 hand" ng-if="nothing">404</h2>
                    <p class="text-gray2" ng-if="moderation.length == 0 && !nothing">Moderate yourself.</p>
                </div>

                <div class="col-lg-12" ng-if="!nothing">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th class="orange-text col-lg-1">Video</th>
                            <th class="orange-text col-lg-1">Character</th>
                            <th class="orange-text col-lg-5">Comment</th>
                            <th class="orange-text col-lg-2">Timestamp</th>
                            <th class="orange-text col-lg-3" colspan="3">Actions</th>
                        </tr>
                        </thead>
                        <tbody ng-if="moderation.length > 0">
                        <tr ng-repeat="c in moderation">
                            <td><a href="#/watch/c.video_id" target="_blank">c.video_id</a></td>
                            <td>c.char</td>
                            <td class="text-muted">"c.comment"</td>
                            <td>c.stamp</td>
                            <td class="text-primary hand" ng-click="moderate(c.id, 1)">
                                <i class="fa fa-fw fa-check"></i> Ok
                            </td>
                            <td></td>
                            <td class="text-danger hand" ng-click="moderate(c.id, -1)">
                                <i class="fa fa-fw fa-times"></i> Delete
                            </td>
                        </tr>
                        </tbody>
                        <tfoot ng-if="moderation.length == 0">
                        <tr>
                            <Th colspan="7" class="text-center text-muted">All quiet in here.</Th>
                        </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        @break
        @default
            @forelse($channels as $channel)
                <div class="col-lg-12 mb-5">
                    <h3 class="">
                        <span class="hand" onclick="window.location='{{ route('watch.channel', ['channel' => $channel['name_slug']]) }}'">{{ $channel['name'] }}</span>
                        @if (count($channel['videos']) > 16)
                            <a href="{{ route('watch.channel', ['channel' => $channel['name_slug']]) }}" class="float-right mt-3 orange-text">See all ({{ count($channel['videos']) }})</a>
                        @endif
                    </h3>

                    <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-2 mb-4 w-100">

                    <div class="row">
                        @forelse($channel['videos'] as $video)
                            @if ($loop->index == 16)
                                @break
                            @endif
                            @livewire('video-thumb', ['id' => $video['id'], 'thumb' => $video['thumb'], 'title' => $video['title'], 'duration' => $video['duration'], 'views' => $video['views'], 'comments' => $video['commentsCount'], 'ago' => $video['ago'], 'url' => $video['url']])
                        @empty
                        @endforelse
                    </div>
                </div>
            @empty
            @endforelse



    @endswitch

    </div>
</div>
