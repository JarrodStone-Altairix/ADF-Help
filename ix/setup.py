from setuptools import setup, find_packages

setup(
    name='ix',
    version='0.0.0',
    url='https://github.com/JarrodStone-Altairix/ix-util',
    license='MIT',
    author='Jarrod Stone',
    author_email='jarrod.stone@altairix.com',
    description='Common utilities package',
    packages=find_packages(exclude=['tests']),
    long_description=open('README.md').read(),
    zip_safe=False
)
