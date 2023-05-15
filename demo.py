import pyspark
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
spark = SparkSession.builder.appName('LinhVo').getOrCreate()
myschame = StructType([StructField('User_ID', IntegerType(), True),
                      StructField('Name', StringType(), True),
                      StructField('Age', IntegerType(), True),
                      StructField('Friends', IntegerType(), True),])
df = spark.read.format('csv').schema(myschame).option('path','fakefriends.csv').load()