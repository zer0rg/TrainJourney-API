const beforeDeleteTrainerTrigger =` DELIMITER $$

CREATE TRIGGER 'beforeDeleteTrainerTrigger'
BEFORE DELETE ON 'Trainers'
FOR EACH ROW
BEGIN
  DECLARE alt_id INT;

    SELECT t.id
      INTO alt_id
      FROM 'Trainers' t
      WHERE t.'companyId' = OLD.'companyId'
        AND t.'isAdmin' = 1
      LIMIT 1;

    IF alt_id IS NULL THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No existe otro entrenador en la misma empresa para reasignar coches.';
    END IF;

    UPDATE 'Services'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';

    UPDATE 'Excersises'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
    
    UPDATE 'Excersises'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
END $$

DELIMITER ;
`