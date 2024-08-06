<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 hand mb-4 @if ($vertical) col-lg-12 @endif" onclick="window.location='{{ $url }}'" wire:key="{{ $title }}">

    <div style="background-image:url(&quot;{{ $thumb }}&quot;)" class="thumb">
        <i class="fa fa-fw fa-play"></i>
        <div class="duration">
            {{ $duration }}
        </div>
    </div>
    <div class="orange-text mt-1 font-weight-bold">
        {{ $title }}
    </div>
    <p class="text-gray2">
        <small>{{ $views }} @if ($views == 1) view @else views @endif</small>
        <small> • {{ $comments }} @if ($comments == 1) comment @else comments @endif</small>
        <!--      <small class="float-right">{{ $ago }}</small>-->
    </p>

</div>
