-- BIGS
INSERT INTO "profile" ("profile_type", "first_name", "last_name", "sex", "dob_or_age", "race", "address", "latitude", "longitude", "ems", "summary", "preference", "interest", "b_employer", "b_occupation", "b_marital_status", "ready")
VALUES
('1', 'Sam', 'Jones', '2', '32', 'White', '3904 Main Street, Kansas City, MO 64111', '39.0560072', '-94.5886469', 'Ima Matchmaker', '{"sample": "Sam works as a nurse at Truman hospital, so he has some flexible hours. He likes to kayak and hike but also enjoys films with sub-titles. Sam has a cat. Sam is a non-smoker and rarely drinks alcohol.  He was raised by a single mother here in Kansas City, but recently met his birth father for the first time and it was a positive experience. This was a big factor in motivating him to volunteer because not everyone gets a second chance at having a father."}', '{"sample": "Open to all, no preferences stated"}', 'health & fitness, outdoors, foreign films, medicine, science', 'Truman Medical Center', 'Nurse', 'Single', 'TRUE'),

('1', 'Wilma', 'Franklin', '1', '48', 'Chinese/White - biracial', '2114 Elma Street, Kansas City, MO 64124', '39.1097231', '-94.5566433', 'Ima Matchmaker', '{"sample": "Wilma loves kids which is why she teaches music. She has a grown son and daughter who live out of state. Wilma was widowed last year after her husband had an aggressive cancer. Wilma has many friends and associates with the local performing arts scene and also serves on fundraising committees. Wilma likes dogs but is allergic so she cannot have one at home, instead she visits dog parks often - she does ok with allergy meds and a long shower after. She has spare instruments if the Little is interested in learning to play something. However, they do not have to like music. She is happy to introduce them to it, or not at all. She is willing to learn new things too and would welcome getting inspired by the interests of her Little."}', '{"sample": "Open to all, no preferences stated"}', 'theater, performance arts, concerts, taking train trips, visiting dog parks', 'Self-employed', 'Music Teacher', 'Widow', 'TRUE'),

('2', 'Tamara and Michael', 'Ross', '0', '32, 28', 'African American', '6031 Cherry Street, Kansas City, MO 64110', '39.0173911', '-94.5812938', 'Ima Matchmaker', '{"sample": "Tamara (32) and Michael (28) are wanting to eventually adopt a child but want to volunteer to better prepare them for adopting an older child. They love exploring Kansas City, discovering people, places, and things. They moved to KC 4 years ago from Memphis and intend to stay here. They are members of Calvary Temple Baptist Church and just started to teach Sunday School - also as a way to decide on what age and gender they would like to adopt and if they feel ready to adopt more than one child (siblings). They were emphatic that their decision to adopt in the future will not change their commitment to their Little. Michael occasionally smokes cigars. They both drink wine or beer, mostly when having dinner out or at a BBQ."}', '{"sample": "Age: 12 and up, no other preferences stated"}', 'boardgames, BBQs, exploring all the water fountains in KC - they have a list and are trying to visit them all', 'City of Kansas City, Hilton', 'City Road Maintenance, Hotel Housekeeping Manager', 'Married', 'TRUE');

-- LITTLES
INSERT INTO "profile" ("profile_type", "first_name", "last_name", "sex", "dob_or_age", "race", "address", "latitude", "longitude", "ems", "summary", "preference", "interest", "l_parent", "l_parent_relationship_to_child", "ready")
VALUES
('2', 'Demonta', 'Miller', '2', '8', 'African American', '3514 Tracy Avenue, Kansas City, MO 64109', '39.0628069','-94.5694119', 'Juana Betterlife', '{"sample": "Demonta is curious about how things work. His adult brother (25 yrs old) takes him to the electronics section of thrift stores and Demonta picks out things to take apart and put back together like radios and VCR players. His uncle is in the military and expects to be deployed so the family wants Demonta to have a male role model to ease the transition as he and his brother are close. They Big/Little relationship will continue regardless of the potential for deployment. Demonta has dyslexia and want to be able to read better because he likes science. There is a set of encyclopedias in the house and he really wants to do more than look at the pictures. The only sport he likes is kickball, and was very emphatic that he does not like soccer and the two are not the same. Demonta also has a good sense of humor, the first thing he wanted to do was tell me a joke."}', '{"sample":"Open but it would be good if the Big was around the same age as the older brother +/- 25 years old"}', 'electronics, reading, jokes and funny things, kickball, science', 'Betty', 'Mother', 'TRUE'),

('2', 'Jason', 'Twinada', '2', '12', 'Japanese American', '1015 Norton Avenue, Kansas City, MO 64127', '39.1000564','-94.5345545', 'Juana Betterlife', '{"sample": "Jason is very outgoing when he is at school or his martial arts class, with those exceptions he is very quiet and introspective. Jason lived with an uncle for 10 years but was removed from that household when his father was released from prison. The uncle what physically abusive but the father is not. Jason learned to have a low profile at home to avoid punishments. He would really like a dog but cannot have one in the apartment they live in, so he is really hoping his Big will have a dog or several dogs. Jason participated in a read-to-a-dog campaign at his school and wanted to be able to do that at home too."}', '{"sample": "Pets: Dog(s), Smoking: No (the uncle smoked and Jason has a negative association), all else Open"}', 'martial arts, reading, likes to build things, country music', 'James', 'Father', 'TRUE'),

('2', 'Kalinda', 'Jones', '1', '13', 'White', '2317 Wabash Avenue, Kansas City, MO 64127', '39.0834741','-94.5533731', 'Juana Betterlife', '{"sample": "Kalinda is struggling with home life. Her father has sole custody but Kalinda sneaks in unsanctioned unsupervised visits with her mom, who has significant substance abuse issues. Kalinda is a below average student and is having trouble adjusting to the idea of going to high school soon and the additional responsibilities that requires. She hopes to go to college to study art but has trouble being disciplined in completing her assignments in all her other classes. Kalinda says the inspiration for her art comes to her in her dreams, and that she dreams in color."}', '{"sample": "Open"}', 'art, drawing, painting, museums, art galleries, art books, art supply shopping', 'Marcus', 'Father', 'TRUE'),

('2', 'Maria', 'Torres', '1', '10', 'Hispanic', '2714 Cypress Avenue, Kansas City, MO 64128', '39.0756894','-94.5305843', 'Juana Betterlife', '{"sample": "Maria is an only child, her mother died in childbirth. Her father is still single. She has aunts, and a grandmother locally but there is a lot of family drama and it plays into how much time they are willing to spend with her. Her father would like to have a stable female outside the family that Maria can depend on, especially when the family is at odds. Maria loves animals and would like to volunteer at a shelter, so if the Big is interested in that as well, she is hoping that could be a regular activity."}', '{"sample": "Pets: yes please - any, Smoking: No (tobacco allergy), all else Open"}', 'YouTube videos on fancy hairstyles, all animals, dancing, cooking', 'Francisco', 'Father', 'TRUE');

-- REVIEW
INSERT INTO "status"
    ("big_id", "little_id", "review", "comment")
VALUES
('4', '8', '3', 'A good fit because Sam and Jason are both establishing new relationships with their fathers.'), ('4', '7', '2', 'There could be potential here. Although Sam''s science background could work well with Demonta''s curiosity, Sam is a little older than Demonta''s mother prefers.'), ('5', '9', '2', 'Although their art preferences differ, studio vs. performing, these two are both creative people. Wilma has reservations about Kalinda sneaking out and is not sure she is ready to take on a teenager.'), ('5', '10', '3', 'Both express an interest in dogs, but neither can have one. It could be a strong bonding factor.  Maria would do well to have a consistent independent woman role model to contrast the drama and codependencies in her current family dynamic. We think Maria would take to the performing arts with opportunities to costuming, makeup, etc.'), ('6', '7', '3', 'Michael is close in age to Demonta''s brother. The Ross family hopes they can use their love for games to help Demonta find strategies to deal with the dyslexia.'), ('6', '8', '1', 'Michael''s cigar smoking might/might not be an issue. If this potential match is considered in the future, it shold be discussed.'), ('6', '9', '2', 'Kalinda wasn''t a strong fit for Tamara, so they opted for Demonta since Michael was a good pairing.'), ('6', '10', '2', 'There were no issues with this possible pairing, but there was more connection potential with another Big.');