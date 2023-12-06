/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Clear from '../../../../assets/images/clear.svg'
import Eraser from '../../../../assets/images/eraser.svg'
import Pencil from '../../../../assets/images/pencil.svg'
import Redo from '../../../../assets/images/redo.svg'
import Undo from '../../../../assets/images/undo.svg'

export interface CanvaTestTwoProps {
  canvasRef:any;
  content: any;
}

export const CanvaTestTwo:FC<CanvaTestTwoProps> = ({ canvasRef, content }) => {
  const { t } = useTranslation()

  const styles = {
    border: '1.2px solid #E5E5E5',
    width: '85vw',
    height: '50vh'
  }

  useEffect(() => {
    if (canvasRef && content) {
      canvasRef.current.loadPaths(JSON.parse(content))
    }
  }, [canvasRef, content])

  return (
    <>
      <div className="flex justify-between px-2 py-2">
        <div className="">
          <button
            onClick={() => {
              canvasRef.current.undo()
            }}
            className="outline-none focus:outline-none"
          >
            <img src={Undo} alt="Undo icon" className="w-5 inline-block" />
            <span className="inline-block text-xs"></span>
          </button>

          <button
            onClick={() => {
              canvasRef.current.redo()
            }}
            className="px-1 sm:px-3 outline-none focus:outline-none border-r border-gray"
          >
            <img src={Redo} alt="Undo icon" className="w-5 inline-block" />
            <span className="inline-block text-xs"></span>
          </button>

          <button
            onClick={() => {
              canvasRef.current.eraseMode(true)
            }}
            className="pl-3 outline-none focus:outline-none"
          >
            <img src={Eraser} alt="Undo icon" className="w-5 inline-block" />
            <span className="inline-block text-xs">{t('erase')}</span>
          </button>

          <button
            onClick={() => {
              canvasRef.current.eraseMode(false)
            }}
            className="px-3 outline-none focus:outline-none border-r border-gray"
          >
            <img src={Pencil} alt="Undo icon" className="w-5 inline-block" />
            <span className="inline-block text-xs">{t('write')}</span>
          </button>

          <button
            onClick={() => {
              canvasRef.current.clearCanvas()
            }}
            className="pl-3 outline-none focus:outline-none"
          >
            <img src={Clear} alt="Undo icon" className="w-5 inline-block" />
            <span className="inline-block text-xs">{t('clear')}</span>
          </button>
        </div>
      </div>

      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        strokeWidth={1}
        strokeColor="black"
      />
    </>
  )
}
