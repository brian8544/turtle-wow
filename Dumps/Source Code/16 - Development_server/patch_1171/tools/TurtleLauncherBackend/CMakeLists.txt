# Giperion January 2024
# TurtleWoW project

cmake_minimum_required(VERSION 2.6...3.20)
project (TurtleLauncherBackend)

add_executable(TurtleLauncherBackend
    TurtleLauncherBackend.cpp
    )

SET_TARGET_PROPERTIES(TurtleLauncherBackend PROPERTIES FOLDER Misc)

target_link_libraries(TurtleLauncherBackend
  shared
  framework
  ${OPENSSL_LIBRARIES}
  ${ACE_LIBRARIES}
)

include_directories(
    ${CMAKE_SOURCE_DIR}/src/framework
    ${CMAKE_SOURCE_DIR}/src/framework/Network
    ${CMAKE_SOURCE_DIR}/src/shared
    ${CMAKE_SOURCE_DIR}/dep/include
    ${OPENSSL_INCLUDE_DIR}
    ${ACE_INCLUDE_DIR}
)

if(WIN32)
  include_directories(
    ${CMAKE_SOURCE_DIR}/dep/include-windows
  )
endif()

install(TARGETS TurtleLauncherBackend DESTINATION ${BIN_DIR})
