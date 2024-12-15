<?php
class ClaimRequest {
    public $request_id;
    public $item_id;
    public $user_id;
    public $status;
    public $request_date;
    public $processed_by;

    public function __construct($request_id, $item_id, $user_id, $status, $request_date, $processed_by = null) {
        $this->request_id = $request_id;
        $this->item_id = $item_id;
        $this->user_id = $user_id;
        $this->status = $status;
        $this->request_date = $request_date;
        $this->processed_by = $processed_by;
    }
}
?>
