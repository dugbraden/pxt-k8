
//% weight=12 color=#ab47bc icon="\uf06e"
namespace lineSensors {
  export enum IRSensor {
    //% block="left"
    LEFT = 7,
    //% block="centre"
    CENTRE = 8,
    //% block="right"
    RIGHT = 9
  }

  export enum IRColour {
    //% block="black"
    BLACK,
    //% block="white"
    WHITE
  }

    /*
    * Return the state of each sensor in an array of boolean
    * Each digit represents the on/off state of a sensor
    * Hundreds place is 'L', tens place is 'C', ones place is 'R'
    */
    //% block
    //% weight=50
    //% advanced=true
    export function checkAllSensors(): Array<boolean> {
      let result: Array<boolean>
      result.push(pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200)
      result.push(pins.analogReadPin(k8.IR_SENSOR_CENTRE) > 200)
      result.push(pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200)
      return result
    }

    /**
     * Reads binary values from 3 IR sensors
     * @param sensor which of the three sensors
     * @param colour whether the sensor looks for black or white
     */
    //% block
    //% blockId=line_check_sensor block="%sensor| sensor is %colour|"
    //% weight=60
    export function checkSensor(sensor: IRSensor, colour: IRColour = IRColour.WHITE): boolean {
      let read: boolean
        switch (sensor) {
          case IRSensor.LEFT:
            read = pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200
            break
          case IRSensor.CENTRE:
            read = pins.analogReadPin(k8.IR_SENSOR_CENTRE) > 200
            break
          case IRSensor.RIGHT:
            read = pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200
            break
        }
        if (colour == IRColour.WHITE) {
          return !read
        }
        return read
    }

    /**
     * Displays binary values from 3 IR sensors (used for line detection)
     */
    //% block
    //% weight=50
    export function displaySensors(): void {
      let i: number
      for (i = 0; i < 5; i++)
        led.plot(i, 4)

      if (checkSensor(IRSensor.LEFT)) {
        plotBar(4)
      } else {
        unplotBar(4)
      }

      if (checkSensor(IRSensor.CENTRE)) {
        plotBar(2)
      } else {
        unplotBar(2)
      }

      if (checkSensor(IRSensor.RIGHT)) {
        plotBar(0)
      } else {
        unplotBar(0)
      }
    }

    function plotBar(x: number) {
      led.plot(x, 1)
      led.plot(x, 2)
      led.plot(x, 3)
    }
    function unplotBar(x: number) {
      led.unplot(x, 1)
      led.unplot(x, 2)
      led.unplot(x, 3)
    }
}
