<div class="modal fade" id="editCommentModal" tabindex="-1" aria-labelledby="editCommentModalLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog p-5">
        <div class="modal-content">
            <div class="d-flex justify-content-between">
                <h5 class="modal-title text-white pl-3 pt-3 pb-1" id="editCommentModalLabel">Edit Comment</h5>
            </div>
            <div class="modal-body">
                <textarea class="form-control" id="editCommentTextarea" rows="5" wire:model="commentText"></textarea>
            </div>
            <div class="d-flex justify-content-end mb-3 mr-2">
                <button type="button" class="btn btn-secondary mr-2" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" wire:click="save">Save changes</button>
            </div>
        </div>
    </div>
</div>
