I have confirmed the issue.

I believe the issue is with the event that does fire (when removing the value) is not updating state correctly.
I have created a test form in in production and verified the issue. That form dumps some state information for review.

https://terarychambers.formstack.com/forms/test_date_field_v4_persistant_user_data
https://tchambers.dev-formstack.com/forms/form_2250_date_field_state_data_not_clearing
