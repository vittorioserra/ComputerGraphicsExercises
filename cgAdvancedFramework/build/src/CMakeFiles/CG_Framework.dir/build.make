# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /var/lib/snapd/snap/cmake/1204/bin/cmake

# The command to remove a file.
RM = /var/lib/snapd/snap/cmake/1204/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/vserra/cg/cgAdvancedFramework

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/vserra/cg/cgAdvancedFramework/build

# Include any dependencies generated for this target.
include src/CMakeFiles/CG_Framework.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include src/CMakeFiles/CG_Framework.dir/compiler_depend.make

# Include the progress variables for this target.
include src/CMakeFiles/CG_Framework.dir/progress.make

# Include the compile flags for this target's objects.
include src/CMakeFiles/CG_Framework.dir/flags.make

src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/camera.cpp
src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/camera.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/camera.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/camera.cpp

src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/camera.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/camera.cpp > CMakeFiles/CG_Framework.dir/framework/camera.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/camera.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/camera.cpp -o CMakeFiles/CG_Framework.dir/framework/camera.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/cg_helper.cpp
src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/cg_helper.cpp

src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/cg_helper.cpp > CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/cg_helper.cpp -o CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui.cpp
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui.cpp

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui.cpp > CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui.cpp -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_draw.cpp
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_draw.cpp

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_draw.cpp > CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_draw.cpp -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_impl_sdl_gl3.cpp
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_impl_sdl_gl3.cpp

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_impl_sdl_gl3.cpp > CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_impl_sdl_gl3.cpp -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_orient.cpp
src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_orient.cpp

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_orient.cpp > CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/imgui/imgui_orient.cpp -o CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/objLoader.cpp
src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/objLoader.cpp

src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/objLoader.cpp > CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/objLoader.cpp -o CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/pngLoader.cpp
src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/pngLoader.cpp

src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/pngLoader.cpp > CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/pngLoader.cpp -o CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/shaderManager.cpp
src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/shaderManager.cpp

src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/shaderManager.cpp > CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/shaderManager.cpp -o CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.s

src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o: src/CMakeFiles/CG_Framework.dir/flags.make
src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o: /home/vserra/cg/cgAdvancedFramework/src/framework/window.cpp
src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o: src/CMakeFiles/CG_Framework.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Building CXX object src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o -MF CMakeFiles/CG_Framework.dir/framework/window.cpp.o.d -o CMakeFiles/CG_Framework.dir/framework/window.cpp.o -c /home/vserra/cg/cgAdvancedFramework/src/framework/window.cpp

src/CMakeFiles/CG_Framework.dir/framework/window.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/CG_Framework.dir/framework/window.cpp.i"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/vserra/cg/cgAdvancedFramework/src/framework/window.cpp > CMakeFiles/CG_Framework.dir/framework/window.cpp.i

src/CMakeFiles/CG_Framework.dir/framework/window.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/CG_Framework.dir/framework/window.cpp.s"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/vserra/cg/cgAdvancedFramework/src/framework/window.cpp -o CMakeFiles/CG_Framework.dir/framework/window.cpp.s

# Object files for target CG_Framework
CG_Framework_OBJECTS = \
"CMakeFiles/CG_Framework.dir/framework/camera.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o" \
"CMakeFiles/CG_Framework.dir/framework/window.cpp.o"

# External object files for target CG_Framework
CG_Framework_EXTERNAL_OBJECTS =

src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/camera.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/cg_helper.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_draw.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_impl_sdl_gl3.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/imgui/imgui_orient.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/objLoader.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/pngLoader.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/shaderManager.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/framework/window.cpp.o
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/build.make
src/libCG_Framework.a: src/CMakeFiles/CG_Framework.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/vserra/cg/cgAdvancedFramework/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_11) "Linking CXX static library libCG_Framework.a"
	cd /home/vserra/cg/cgAdvancedFramework/build/src && $(CMAKE_COMMAND) -P CMakeFiles/CG_Framework.dir/cmake_clean_target.cmake
	cd /home/vserra/cg/cgAdvancedFramework/build/src && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/CG_Framework.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
src/CMakeFiles/CG_Framework.dir/build: src/libCG_Framework.a
.PHONY : src/CMakeFiles/CG_Framework.dir/build

src/CMakeFiles/CG_Framework.dir/clean:
	cd /home/vserra/cg/cgAdvancedFramework/build/src && $(CMAKE_COMMAND) -P CMakeFiles/CG_Framework.dir/cmake_clean.cmake
.PHONY : src/CMakeFiles/CG_Framework.dir/clean

src/CMakeFiles/CG_Framework.dir/depend:
	cd /home/vserra/cg/cgAdvancedFramework/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/vserra/cg/cgAdvancedFramework /home/vserra/cg/cgAdvancedFramework/src /home/vserra/cg/cgAdvancedFramework/build /home/vserra/cg/cgAdvancedFramework/build/src /home/vserra/cg/cgAdvancedFramework/build/src/CMakeFiles/CG_Framework.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : src/CMakeFiles/CG_Framework.dir/depend

