<?php
class Item {
    public $item_id;
    public $title;
    public $description;
    public $date_found;
    public $time_found;
    public $location_found;
    public $category;
    public $status;
    public $item_img;
    public $first_name;
    public $last_name;
    public $email;

    public function __construct($item_id, $title, $description, $date_found, $time_found, $location_found, $category, $status, $item_img, $first_name, $last_name, $email) {
        $this->item_id = $item_id;
        $this->title = $title;
        $this->description = $description;
        $this->date_found = $date_found;
        $this->time_found = $time_found;
        $this->location_found = $location_found;
        $this->category = $category;
        $this->status = $status;
        $this->item_img = $item_img;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
    }
}
?>
