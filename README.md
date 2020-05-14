# Fisio Hub
## Queries
- Get appointments. Filter by date and professional. 
    - cIXs: center_id+date+professional_id || cid+pid+date, center_id+patient_id+date.
    Select between selectivity of prof/pat ids and date sorting in memory (which should be avoided).
- Get user. IX on email.
- Get professional. IX on center_id+email ?
  - Get professional patients. Sort by last appointment.
- Get center patients by last name and first name. cIX center_id+lastName+firstName, center_id+firstName.
  First and last name fields should have text indexes.

    Maybe create a field of fullName + phone number to create a tIX there.
- Get services.
- Get payments. Filter by date and professional. cIX: (appointments) center_id+date+professional_id+payment ?
    It might be better to not index it as a write-op is performed more times than a query.
    
    We could also put the IX in payment.method OR use { sparse: true } or a partial index.
    
    Another option is create the cpIX center_id+professional_id+payment.method when payment exists.
## Writes
- Create center
- Create user
- Create user roles (professional and patient)
- Update a professional to make it admin (as a center admin).
- Create and update patients. Upsert?
- Create and update appointments. Upsert?
- Add payment to appointment.

- Create/destroy sessions (login/logout) for a user_id and role_id and type (professional/patient).

## Sharding
A good compound sharding key would be the hashed_center_id and the last_name, 
properties present in all sharding-candidate collections but user. This allows routed queries
and a good distribution over shard nodes.

For users, we can use the email.

These options have good cardinality, low frequency and are not monotonically increasing values. 