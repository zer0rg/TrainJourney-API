const beforeDeleteTrainerTrigger =` DELIMITER $$

CREATE TRIGGER 'beforeDeleteTrainerTrigger'
BEFORE DELETE ON 'Trainers'
FOR EACH ROW
BEGIN
  DECLARE alt_id INT;

    SELECT t.id INTO alt_id 
    FROM Trainer t
    JOIN Entity e ON e.id = t.campoEntity
    WHERE e.defaultTrainerId = t.id;

    IF alt_id IS NULL THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No existe otro entrenador en la misma empresa para reasignar los objetos.';
    END IF;

    UPDATE 'Students'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id'

    UPDATE 'Services'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';

    UPDATE 'Excersises'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
    
    UPDATE 'ExcersisesPlans'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
      
    UPDATE 'Recets'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';

    UPDATE 'Reservations'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
    
    UPDATE 'Planifications'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
    
    UPDATE 'NutritionalPlans'
        SET 'trainerId' = alt_id
        WHERE 'trainerId' = OLD.'id';
        
    UPDATE 'DailyPLans'
    SET 'trainerId' = alt_id
    WHERE 'trainerId' = OLD.'id';

  END $$
        
DELIMITER ;
`