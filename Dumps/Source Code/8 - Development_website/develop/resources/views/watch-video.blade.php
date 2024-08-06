@include('layout.head')

<body>


@include('layout.header')

<div class="section mb-5 watch" id="pages">
    <div class="container-fluid pb-5">
        @livewire('video', [
            'id' => $id,
            'name' => $name,
            'thumb' => $thumb,
            'title' => $title,
            'duration' => $duration,
            'stamp' => $stamp,
            'ago' => $ago,
            'views' => $views,
            'downloads' => $downloads,
            'commentsCount' => $commentsCount,
            'comments' => $comments,
            'otherVideos' => $otherVideos,
            'likes' => $likes,
            'dislikes' => $dislikes,
            'liked' => $liked,
            'disliked' => $disliked
        ])
    </div>
</div>



@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
