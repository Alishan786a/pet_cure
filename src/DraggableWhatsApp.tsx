import { useCallback, useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'

type Pos = { left: number; top: number }

const DRAG_THRESHOLD = 8

export function DraggableWhatsApp({ href, label }: { href: string; label: string }) {
  const [pos, setPos] = useState<Pos | null>(null)
  const [draggingUi, setDraggingUi] = useState(false)
  const dragActiveRef = useRef(false)
  const movedRef = useRef(false)
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    originLeft: 0,
    originTop: 0,
    pointerId: 0,
  })
  const wrapRef = useRef<HTMLDivElement>(null)

  const clamp = useCallback((left: number, top: number) => {
    const el = wrapRef.current
    if (!el) return { left, top }
    const pad = 10
    const w = el.offsetWidth
    const h = el.offsetHeight
    return {
      left: Math.min(Math.max(pad, left), window.innerWidth - w - pad),
      top: Math.min(Math.max(pad, top), window.innerHeight - h - pad),
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      setPos((p) => {
        if (!p) return p
        return clamp(p.left, p.top)
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clamp])

  const onPointerDown = (e: React.PointerEvent) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originLeft: r.left,
      originTop: r.top,
      pointerId: e.pointerId,
    }
    movedRef.current = false
    dragActiveRef.current = true
    setDraggingUi(true)
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragActiveRef.current) return
    const d = dragRef.current
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      movedRef.current = true
    }
    const next = clamp(d.originLeft + dx, d.originTop + dy)
    setPos(next)
  }

  const endDrag = () => {
    const el = wrapRef.current
    if (el && dragActiveRef.current) {
      try {
        el.releasePointerCapture(dragRef.current.pointerId)
      } catch {
        /* ignore */
      }
    }
    if (dragActiveRef.current && !movedRef.current) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
    dragActiveRef.current = false
    setDraggingUi(false)
  }

  const style: React.CSSProperties =
    pos !== null
      ? { position: 'fixed', left: pos.left, top: pos.top, right: 'auto', bottom: 'auto', zIndex: 320 }
      : { position: 'fixed', right: 20, bottom: 24, zIndex: 320 }

  return (
    <div
      ref={wrapRef}
      className={`wa-float${draggingUi ? ' wa-float--dragging' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.open(href, '_blank', 'noopener,noreferrer')
        }
      }}
    >
      <span className="wa-float__pulse wa-float__pulse--a" aria-hidden />
      <span className="wa-float__pulse wa-float__pulse--b" aria-hidden />
      <span className="wa-float__ring" aria-hidden />
      <span className="wa-float__glow" aria-hidden />
      <FaWhatsapp className="wa-float__icon" aria-hidden />
    </div>
  )
}
