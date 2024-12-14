<?php
class User {
    public $user_id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $phone_number;
    public $role;

    public function __construct($user_id, $first_name, $last_name, $email, $password, $phone_number, $role) {
        $this->user_id = $user_id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->password = $password;
        $this->phone_number = $phone_number;
        $this->role = $role;
    }
}
?>
