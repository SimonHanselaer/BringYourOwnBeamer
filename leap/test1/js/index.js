{
  const fpsDisplay = document.getElementById("leapFPS");
  const handCountDisplay = document.getElementById("handCount");
  const pointableCountDisplay = document.getElementById("pointableCount");
  const fingerCountDisplay = document.getElementById("fingerCount");
  const toolCountDisplay = document.getElementById("toolCount");
  const gestureCountDisplay = document.getElementById("gestureCount");
  const avgDisplay = document.getElementById("avgPosition");

  const init = () => {
    const controller = new Leap.Controller({
      enableGestures: true,
      frameEventName: "animationFrame"
    });

    controller.on("frame", function(frame) {
      //framerate
      fpsDisplay.innerText = frame.currentFrameRate;
      // het aantal handen
      handCountDisplay.innerText = frame.hands.length;
      // het aantal Pointable objects (fingers and tools)
      pointableCountDisplay.innerText = frame.pointables.length;
      // het aantal vingers
      fingerCountDisplay.innerText = frame.fingers.length;
      //het aantal tools
      toolCountDisplay.innerText = frame.tools.length;
      //het aantal gestures
      gestureCountDisplay.innerText = frame.gestures.length;
      //The instantaneous rate at which the Leap Motion controller is producing frames.
      //   const fps = frame.currentFrameRate;
      //   console.log(fps);
      // The list of Finger objects detected in this frame, given in arbitrary order. The list can be empty if no fingers are detected.
      for (let f = 0; f < frame.fingers.length; f++) {
        const finger = frame.fingers[f];
        //console.log(finger);
      }
      //The list of Hand objects detected in this frame, given in arbitrary order. The list can be empty if no hands are detected.
      for (let h = 0; h < frame.hands.length; h++) {
        const hand = frame.hands[h];
        // console.log("hand", hand);
      }

      // If you have an ID of an entity from a different frame, you can get the object representing that entity in the current frame.
      // Pass the ID to the Frame function of the appropriate type. The following example finds a Pointable object in past frames to average the tip position.
      // If you have an ID of an entity from a different frame, you can get the object representing that entity in the current frame. Pass the ID to the Frame function of the appropriate type.
      // The following example finds a Pointable object in past frames to average the tip position.
      if (frame.valid && frame.fingers.length > 0) {
        let count = 0;
        const average = Leap.vec3.create();
        const fingerToAverage = frame.fingers[0];
        for (i = 0; i < 10; i++) {
          const fingerFromFrame = controller
            .frame(i)
            .finger(fingerToAverage.id);
          if (fingerFromFrame.valid) {
            Leap.vec3.add(average, average, fingerFromFrame.tipPosition);
            count++;
          }
        }
        if (count > 0) {
          Leap.vec3.scale(average, average, 1 / count);
          avgDisplay.innerText =
            average[0] + ", " + average[1] + ", " + average[2];
        }
      }

      if (frame.hands.length > 0) {
        const hand = frame.hands[0];
        let position = hand.palmPosition;
        let velocity = hand.palmVelocity;
        let direction = hand.direction;
        let arm = hand.arm;
        console.log("position : ", position);
        // console.log("velocity : ", velocity);
        // console.log("direction : ", direction);

        // // Basis vectors fo the arm property specify the orientation of a arm:
        // //arm.basis[0] – the x-basis. Perpendicular to the longitudinal axis of the arm; exits laterally from the sides of the wrist.
        // //arm.basis[1] – the y-basis or up vector. Perpendicular to the longitudinal axis of the arm; exits the top and bottom of the arm. More positive in the upward direction.
        // //arm.basis[2] – the z-basis. Aligned with the longitudinal axis of the arm. More positive toward the elbow.
        // console.log("arm : ", arm);

        let type = hand.type;
        //console.log(type);

        let rollRadians = hand.roll();
        //console.log(rollRadians);

        console.log(hand.toString());
      }
    });

    controller.connect();
  };
  init();
}
