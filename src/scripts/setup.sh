#!/bin/bash

# TODO: Rename package name, folders, maintainer, reinit git, etc.

# Exit on error
set -e

# Variables
script_dir=$(dirname "$0")
project_dir=$(cd "$script_dir/../.." && pwd)

echo "Script directory: '$script_dir'"
echo "Project directory: '$project_dir'"
echo ""

# Ask for new project name
echo "Enter new project's name: "
read -r project_name
echo "Chosen name: '$project_name'"
echo ""

# Ask for destination directory - default is parent directory
echo "Enter destination directory (default: parent directory, if left empty): "
read -r destination_dir
if [ -z "$destination_dir" ]; then
	destination_dir=$(dirname "$project_dir")
fi
echo "Chosen destination directory: '$destination_dir'"
echo ""

# Ask for author / maintainer
echo "Enter author / maintainer: "
read -r author
echo "Chosen author / maintainer: '$author'"
echo ""

# Copy template to new project directory
new_project_dir=$destination_dir/$project_name
# If the new project directory already exists, ask to overwrite
if [ -d "$new_project_dir" ]; then
	echo "Project directory '$new_project_dir' already exists. Do you want to overwrite it? (y/N)"
	read -r overwrite
	if [ "$overwrite" != "y" ]; then
		echo "Exiting..."
		exit 1
	fi
	echo "Removing existing project directory..."
	rm -rf "$new_project_dir"
fi
echo "Copying template to '$new_project_dir'..."
cp -r "$project_dir" "$new_project_dir"
echo "Done."
echo "Moving to new project directory..."
cd "$new_project_dir"
echo "Done."
echo ""

# Replace project name / references in files
source_name="nodejs-template"
echo "Replacing project name / references in files from '$source_name' to '$project_name'..."
find "$new_project_dir" -type f -exec sed -i "s/$source_name/$project_name/g" {} +
echo "Done."
echo ""

# Replace author / maintainer in package.json
source_author="Robert Barachini"
echo "Replacing author / maintainer in files from '$source_author' to '$author'..."
find "$new_project_dir" -type f -exec sed -i "s/$source_author/$author/g" {} +
echo "Done."

# Clean certain directories and files
echo "Cleaning up..."
# Remove setup script
echo "Removing setup script from '$new_project_dir/src/scripts/setup.sh'..."
rm -f "$new_project_dir/src/scripts/setup.sh"
# Remove pnpm-lock.yaml
if [ -f "$new_project_dir/pnpm-lock.yaml" ]; then
	echo "Removing old pnpm-lock.yaml..."
	rm -f "$new_project_dir/pnpm-lock.yaml"
fi
# Remove package-lock.json
if [ -f "$new_project_dir/package-lock.json" ]; then
	echo "Removing package-lock.json..."
	rm -f "$new_project_dir/package-lock.json"
fi
# Remove .env
if [ -f "$new_project_dir/.env" ]; then
	echo "Removing .env..."
	rm -f "$new_project_dir/.env"
fi
# Remove LICENSE
if [ -f "$new_project_dir/LICENSE" ]; then
	echo "Removing LICENSE..."
	rm -f "$new_project_dir/LICENSE"
fi
# Remove contents of .private directory (but not the directory itself)
if [ -d "$new_project_dir/.private" ]; then
	echo "Removing contents of .private directory..."
	rm -rf "$new_project_dir/.private"/*
fi
# Remove contents of dist directory (but not the directory itself)
if [ -d "$new_project_dir/dist" ]; then
	echo "Removing contents of dist directory..."
	rm -rf "$new_project_dir/dist"/*
fi
# Remove logs directory
if [ -d "$new_project_dir/logs" ]; then
	echo "Removing logs directory..."
	rm -rf "$new_project_dir/logs"
fi
# Remove node_modules directory
if [ -d "$new_project_dir/node_modules" ]; then
	echo "Removing node_modules directory..."
	rm -rf "$new_project_dir/node_modules"
fi
echo "Done."
echo ""

# Re-init README.md
echo "Re-initializing README.md..."
echo "# $project_name" > README.md
echo "" >> README.md
echo "Project structure initialized using [nodejs-template](https://github.com/RobertBarachini/nodejs-template)." >> README.md
echo "" >> README.md
echo "Initialized on $(date +'%Y-%m-%d %H:%M')." >> README.md
echo "Done."
echo ""

# Re-init git
echo "Re-initializing git..."
rm -rf .git
git init -b main
echo "Done."
echo ""

# Install dependencies
echo "Installing default dependencies..."
pnpm install
echo "Done."
echo ""

# TODO: edit some other package.json fields

echo "All done... Inspect the project directory '$new_project_dir' and make any necessary changes."
echo "Enjoy!"
