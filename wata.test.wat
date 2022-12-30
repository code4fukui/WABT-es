(module
  (func $addTwo (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add
  )
  (func (export "main") (result i32)
    i32.const 10
    i32.const 5
    call $addTwo
  )
)
