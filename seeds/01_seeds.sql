INSERT INTO users (name, email, password) VALUES('Ayushi','Ayushi@123','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES('Miniya','Miniya@123','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES('Gaurav','Gaurav@123','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,cover_photo_url, cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms,country,street,city,province,post_code,active) VALUES
(1,'villa','description','www.abc.com','www.abc.com',20,2,2,2,'canada','street-1','calgary','AB','T3N0V7',TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,cover_photo_url, cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms,country,street,city,province,post_code,active) VALUES
(2,'villa 2','description2','www.abc.com','www.abc.com',20,3,4,3,'canada','street-1','Vancouver','BC','T3N0V7',TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,cover_photo_url, cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms,country,street,city,province,post_code,active) VALUES
(3,'villa 3','description','www.abc.com','www.abc.com',20,1,1,1,'canada','street-1','calgary','AB','T3N0V7',TRUE);


INSERT INTO reservations (start_date,end_date,property_id,guest_id) VALUES ('9/10/2020', '10/10/2020', 1,1);
INSERT INTO reservations (start_date,end_date,property_id,guest_id) VALUES ('8/10/2020', '10/10/2020', 2,2);
INSERT INTO reservations (start_date,end_date,property_id,guest_id) VALUES ('3/10/2020', '10/10/2020', 3,3);

INSERT INTO property_reviews (guest_id,property_id,reservation_id, rating,message) VALUES (1,1,1,5,'good');
INSERT INTO property_reviews (guest_id,property_id,reservation_id, rating,message) VALUES (2,2,2,5,'good');
INSERT INTO property_reviews (guest_id,property_id,reservation_id, rating,message) VALUES (3,3,3,5,'good');


