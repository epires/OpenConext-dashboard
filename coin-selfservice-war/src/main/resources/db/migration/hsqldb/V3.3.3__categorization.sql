-- DELETE FROM facet WHERE id > 0;
-- DELETE FROM facet_value WHERE id > 0;
--
INSERT INTO facet (id, facet_parent_id, name) VALUES (1, null, 'Category');
INSERT INTO facet (id, facet_parent_id, name) VALUES (2, null, 'Target Group');
INSERT INTO facet (id, facet_parent_id, name) VALUES (3, null, 'Data location');

INSERT INTO facet_value (id, facet_id, value) VALUES (1, 1, 'Video');
INSERT INTO facet_value (id, facet_id, value) VALUES (2, 1, 'Collaboration');
INSERT INTO facet_value (id, facet_id, value) VALUES (3, 1, 'Iaas');

INSERT INTO facet_value (id, facet_id, value) VALUES (4, 2, 'University');
INSERT INTO facet_value (id, facet_id, value) VALUES (5, 2, 'University of applied science');
INSERT INTO facet_value (id, facet_id, value) VALUES (6, 2, 'Research');

INSERT INTO facet_value (id, facet_id, value) VALUES (7, 3, 'Netherlands');
INSERT INTO facet_value (id, facet_id, value) VALUES (8, 3, 'Europe');
INSERT INTO facet_value (id, facet_id, value) VALUES (9, 3, 'Unknown');
